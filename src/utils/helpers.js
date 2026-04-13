const _ = require('lodash');

/**
 * Optimized findDuplicates using a Set for O(n) lookup instead of O(n^2) nested loops.
 * @param {Array} arr
 * @returns {Array} List of duplicate elements
 */
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return Array.from(duplicates);
}

/**
 * Optimized buildReport using Array.join() for better string building performance.
 * @param {Array} items
 * @returns {string} Formatted report
 */
function buildReport(items) {
  const lines = items.map(item => `- Item ${item.id}: ${item.name} (Price: ${item.price}, Stock: ${item.stock})`);
  return 'Report:\n' + lines.join('\n') + (lines.length ? '\n' : '');
}

function getUserPermissions(userId, allUsers) {
  const user = allUsers.find(u => u.id === userId);
  if (!user) return [];

  if (user.role === 'admin') {
    return allUsers.filter(u => u.id !== userId).map(u => `can_manage_${u.id}`);
  }
  return ['can_read'];
}

function deepMergeConfigs(base, override) {
  return _.merge({}, base, override);
}

module.exports = {
  findDuplicates,
  buildReport,
  getUserPermissions,
  deepMergeConfigs
};
