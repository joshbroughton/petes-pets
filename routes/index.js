const Pet = require('../models/pet');

module.exports = (app) => {

  /* GET home page. */
  app.get('/', async (req, res) => {
    try {
      const page = req.query.page || 1;
      const results = await Pet.paginate({}, { page: page });
      res.render('pets-index', { pets: results.docs });
    } catch (err) {
      console.log(err.message);
      res.status(500);
    }
  });
}
