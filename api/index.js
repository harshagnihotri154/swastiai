const app = require('../apps/backend/dist/app').default || require('../apps/backend/dist/app');
const { connectDB } = require('../apps/backend/dist/config/db');

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    // Connection established or handling
  }
  return app(req, res);
};
