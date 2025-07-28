const seed = require('./seed');
const devData = require('../data/development-data/index.js');
const db = require('../../connection');

seed(devData)
  .then(() => {
    console.log('✅ Seeding successful!');
  })
  .catch((err) => {
    console.error('❌ Error seeding database:', err);
  })
  .finally(() => {
    db.end(); 
  });

