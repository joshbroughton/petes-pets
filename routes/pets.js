// MODELS
const Pet = require('../models/pet');

// PET ROUTES
module.exports = (app) => {

  // INDEX PET => index.js

  // SEARCH PET
  app.get('/search', async (req, res) => {
    try {
      term = new RegExp(req.query.term, 'i')
      const page = req.query.page || 1;
      const results = await Pet.paginate(
        {
          $or: [
            { 'name': term },
            { 'species': term}
          ]
        },
        { page: page }
      )
      res.render('pets-index', { pets: results.docs, pagesCount: results.pages, currentPage: page, term: req.query.term });
    } catch(err) {
      console.log(err.message);
      res.status(500);
    }

  });

  // NEW PET
  app.get('/pets/new', (req, res) => {
    res.render('pets-new');
  });

  // CREATE PET
  app.post('/pets', async (req, res) => {
    try {
      let pet = new Pet(req.body);
      await pet.save();
      res.send({ pet: pet });
    } catch(err) {
      console.log(err.message);
       res.status(500);
    }
  });
  // CREATE PET
  // app.post('/pets', (req, res) => {
  //   let pet = new Pet(req.body);

  //   pet.save()
  //     .then((pet) => {
  //       res.send({ pet: pet });
  //     })
  //     .catch((err) => {
  //       // STATUS OF 400 FOR VALIDATIONS
  //       res.status(400).send(err.errors);
  //     }) ;
  // });

  // SHOW PET
  app.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-show', { pet: pet });
    });
  });

  // EDIT PET
  app.get('/pets/:id/edit', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-edit', { pet: pet });
    });
  });

  // UPDATE PET
  app.put('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {
        // Handle Errors
      });
  });

  // DELETE PET
  app.delete('/pets/:id', (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      return res.redirect('/')
    });
  });
}
