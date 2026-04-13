const { buildReport } = require('../utils/helpers');

const mockProducts = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Product ${i}`,
  price: (Math.random() * 100).toFixed(2),
  stock: Math.floor(Math.random() * 100)
}));

exports.getReport = (req, res) => {
  const report = buildReport(mockProducts);
  res.send(report);
};
