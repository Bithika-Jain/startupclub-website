const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Try to create data directory only in local dev
const isWritable = () => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return true;
  } catch (err) {
    // Vercel serverless: read-only filesystem
    console.log('⚠️  Read-only filesystem detected (likely Vercel)');
    return false;
  }
};

const CAN_WRITE = isWritable();

/**
 * Read JSON file safely
 */
const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    return [];
  }
};

/**
 * Write data to JSON file safely
 * Returns false on Vercel (read-only fs) but doesn't crash
 */
const writeData = (filename, data) => {
  if (!CAN_WRITE) {
    console.log(`⚠️  Skipping write to ${filename} (read-only fs)`);
    return false;
  }
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filename}:`, error.message);
    return false;
  }
};

/**
 * In-memory fallback storage for Vercel
 */
const memoryStore = {};

/**
 * Append a single item — uses file if possible, memory otherwise
 */
const appendData = (filename, item) => {
  if (CAN_WRITE) {
    const existing = readData(filename);
    existing.push(item);
    const success = writeData(filename, existing);
    return success ? item : null;
  } else {
    // Vercel fallback: store in memory (will reset on cold start)
    if (!memoryStore[filename]) memoryStore[filename] = readData(filename);
    memoryStore[filename].push(item);
    console.log(`💾 Stored in memory: ${filename} (${memoryStore[filename].length} items)`);
    return item;
  }
};

/**
 * Delete item by id
 */
const deleteById = (filename, id) => {
  if (CAN_WRITE) {
    const existing = readData(filename);
    const filtered = existing.filter((item) => item.id !== id);
    if (filtered.length === existing.length) return false;
    return writeData(filename, filtered);
  } else {
    if (!memoryStore[filename]) return false;
    const original = memoryStore[filename].length;
    memoryStore[filename] = memoryStore[filename].filter((item) => item.id !== id);
    return memoryStore[filename].length < original;
  }
};

/**
 * Update item by id
 */
const updateById = (filename, id, updates) => {
  if (CAN_WRITE) {
    const existing = readData(filename);
    const index = existing.findIndex((item) => item.id === id);
    if (index === -1) return null;
    existing[index] = { ...existing[index], ...updates };
    const success = writeData(filename, existing);
    return success ? existing[index] : null;
  } else {
    if (!memoryStore[filename]) return null;
    const index = memoryStore[filename].findIndex((item) => item.id === id);
    if (index === -1) return null;
    memoryStore[filename][index] = { ...memoryStore[filename][index], ...updates };
    return memoryStore[filename][index];
  }
};

/**
 * Get all items (file + memory combined)
 */
const getAll = (filename) => {
  const fileData = readData(filename);
  const memData = memoryStore[filename] || [];
  // Avoid duplicates
  const fileIds = new Set(fileData.map((item) => item.id));
  const uniqueMem = memData.filter((item) => !fileIds.has(item.id));
  return [...fileData, ...uniqueMem];
};

module.exports = {
  readData: getAll,  // Always returns combined data
  writeData,
  appendData,
  deleteById,
  updateById,
};