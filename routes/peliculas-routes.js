const express = require('express');

const peliculasController = require('../Controllers/peliculas-controllers');

const router = express.Router();

router.get('/',peliculasController.getAllPeliculas); 

router.get('/:pid',peliculasController.getPeliculasById);

router.get('/creator/:uid',peliculasController.getPeliculaByCreator);

router.post('/',peliculasController.postPelicula);

router.patch('/:pid',peliculasController.updatedPelicula);

router.delete('/:pid',peliculasController.deletePeliculaById);

module.exports = router;