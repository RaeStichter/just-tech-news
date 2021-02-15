const router = require('express').Router();
// Added 14
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
// end added 14
const apiRoutes = require('./api');

//added 14
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// end added 14
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;