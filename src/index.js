const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/api/data', (req, res) => {
  res.json({ data: 'Some important data' });
});

app.get('/api/unstable', (req, res) => {
  if (req.query.fail === 'true') {
    return res.status(500).json({ error: 'Simulated failure' });
  }
  res.json({ message: 'Success' });
});

app.get('/api/flaky', (req, res) => {
  // Fixed bug: Removed global state leakage that caused flaky errors
  res.json({ message: 'Flaky Success' });
});

// Global error handler to improve API resilience
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
