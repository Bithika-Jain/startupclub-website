const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('📁 Created data directory');
}

/**
 * Read JSON file safely
 * @param {string} filename - Name of the JSON file
 * @returns {Array|Object} Parsed data or empty array
 */
const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      // Create file with empty array if it doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
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
 * @param {string} filename - Name of the JSON file
 * @param {Array|Object} data - Data to write
 * @returns {boolean} Success status
 */
const writeData = (filename, data) => {
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
 * Append a single item to a JSON array file
 * @param {string} filename - Name of the JSON file
 * @param {Object} item - Item to append
 * @returns {Object|null} Saved item or null on failure
 */
const appendData = (filename, item) => {
  const existing = readData(filename);
  existing.push(item);
  const success = writeData(filename, existing);
  return success ? item : null;
};

/**
 * Delete item by id from a JSON array file
 * @param {string} filename - Name of the JSON file
 * @param {string} id - Item ID to delete
 * @returns {boolean} Success status
 */
const deleteById = (filename, id) => {
  const existing = readData(filename);
  const filtered = existing.filter((item) => item.id !== id);
  if (filtered.length === existing.length) return false; // Not found
  return writeData(filename, filtered);
};

/**
 * Update item by id in a JSON array file
 * @param {string} filename - Name of the JSON file
 * @param {string} id - Item ID to update
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated item or null
 */
const updateById = (filename, id, updates) => {
  const existing = readData(filename);
  const index = existing.findIndex((item) => item.id === id);
  if (index === -1) return null;
  existing[index] = { ...existing[index], ...updates };
  const success = writeData(filename, existing);
  return success ? existing[index] : null;
};

module.exports = {
  readData,
  writeData,
  appendData,
  deleteById,
  updateById,
};