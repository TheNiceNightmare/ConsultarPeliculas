const HttpError = require('../models/http-error');
const uuid = require('uuid');

let DUMMY_PELICULAS = [
    {
        id: "p1",
        title: "Batman",
        creator: "Tim Burton"
    },
    {
        id: "p2",
        title: "El Padrino",
        creator: "Francis Ford Coppola"
    },
    {
        id: "p3",
        title: "Sueño de Fuga",
        creator: "Frank Darabont"
    },
    {
        id: "p4",
        title: "Tiempos Violentos",
        creator: "Quentin Tarantino"
    },
    {
        id: "p5",
        title: "El Caballero de la Noche",
        creator: "Christopher Nolan"
    },
    {
        id: "p6",
        title: "Forrest Gump",
        creator: "Robert Zemeckis"
    },
    {
        id: "p7",
        title: "El Origen",
        creator: "Christopher Nolan"
    },
    {
        id: "p8",
        title: "El Club de la Pelea",
        creator: "David Fincher"
    },
    {
        id: "p9",
        title: "Matrix",
        creator: "Las Wachowski"
    },
    {
        id: "p10",
        title: "La Guerra de las Galaxias: Episodio IV - Una Nueva Esperanza",
        creator: "George Lucas"
    },
    {
        id: "p11",
        title: "El Señor de los Anillos: La Comunidad del Anillo",
        creator: "Peter Jackson"
    },
    {
        id: "p12",
        title: "Parque Jurásico",
        creator: "Steven Spielberg"
    },
    {
        id: "p13",
        title: "Titanic",
        creator: "James Cameron"
    },
    {
        id: "p14",
        title: "Avatar",
        creator: "James Cameron"
    },
    {
        id: "p15",
        title: "Gladiador",
        creator: "Ridley Scott"
    },
    {
        id: "p16",
        title: "Volver al Futuro",
        creator: "Robert Zemeckis"
    }
]

const getAllPeliculas = (req, res, next) => {

    res.json({peliculas: DUMMY_PELICULAS });

};
const getPeliculasById = (req, res, next) => {
    const pelicula = DUMMY_PELICULAS.find(p => {
        return p.id === req.params.pid;
    });
    if (!pelicula) {
        const error = new Error('La película no coincide con el ID específico!');
        error.code = 404;
        next(error);
    } else {
        res.json({ pelicula });
    }
}
const getPeliculaByCreator = (req, res, next) => {
    const pelicula = DUMMY_PELICULAS.find(p => {
        return p.creator === req.params.uid
    });

    if (!pelicula) {
        const error = new HttpError('La película no se encuentra según su creador', 404);
        throw error;
    }
    res.json({pelicula});
}
const postPelicula = (req, res, next) => {
    const { title, creator } = req.body;
    const createdPelicula = {
        id: uuid.v4(),
        title,
        creator
    }
    DUMMY_PELICULAS.push(createdPelicula);
    res.status(201).json({ pelicula: createdPelicula })
}

const updatedPelicula = (req, res, next) => {
    const { title } = req.body;
    const peliculaId = req.params.pid;

    const updatedPelicula = { ...DUMMY_PELICULAS.find(p => p.id === peliculaId) };
    const peliculaIndex = DUMMY_PELICULAS.findIndex(p => p.id === peliculaId);

    updatedPelicula.title = title;

    DUMMY_PELICULAS[peliculaIndex] = updatedPelicula;

    res.status(200), json({ pelicula: updatedPelicula })

}

const deletePeliculaById = (req, res, next) => {
    const peliculaId = req.params.pid;
    DUMMY_PELICULAS = DUMMY_PELICULAS.filter(p => p.id === peliculaId);
    res.status(200).json({ message: 'Película eliminada.' });
};

exports.getAllPeliculas = getAllPeliculas;
exports.getPeliculasById = getPeliculasById;
exports.getPeliculaByCreator = getPeliculaByCreator;
exports.postPelicula = postPelicula;
exports.updatedPelicula = updatedPelicula;
exports.deletePeliculaById = deletePeliculaById;