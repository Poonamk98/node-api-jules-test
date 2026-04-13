const { findDuplicates, getUserPermissions } = require('../utils/helpers');

const mockUsers = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  role: i % 2 === 0 ? 'admin' : 'user'
}));

const mockUserIds = mockUsers.map(u => u.id);
// Add some duplicates intentionally
const userIdsWithDupes = [...mockUserIds, 1, 50, 100];

exports.getDuplicates = (req, res) => {
  const duplicates = findDuplicates(userIdsWithDupes);
  res.json({ duplicates });
};

exports.getPermissions = (req, res) => {
  const userId = parseInt(req.params.id) || 0;
  const permissions = getUserPermissions(userId, mockUsers);
  res.json({ permissions });
};
