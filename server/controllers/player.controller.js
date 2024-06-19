const Player = require('../models/player.model');

module.exports = {
    // Crear un jugador nuevo
    createPlayer: (req, res) => {
        const { nombre, posicion, estado } = req.body;

        if (!nombre || !posicion) {
            res.statusMessage = "El nombre y la posición del jugador son requeridos";
            return res.status(400).send(res.statusMessage);
        } else if (nombre.length < 2) {
            res.statusMessage = "El nombre del jugador debe tener al menos 2 caracteres";
            return res.status(400).send(res.statusMessage);
        }

        const jugadorNuevo = {
            nombre,
            posicion,
            estado: estado || "Indeciso"
        };

        Player.create(jugadorNuevo)
            .then((jugador) => res.json(jugador))
            .catch((err) => res.json(err));
    },

    // Obtener todos los jugadores
    getAllPlayers: (req, res) => {
        Player.find()
            .then((jugadores) => res.json(jugadores))
            .catch((err) => res.json(err));
    },

    // Obtener un jugador por ID
    getPlayerById: (req, res) => {
        Player.findOne({ _id: req.params.id })
            .then((jugador) => res.json(jugador))
            .catch((err) => res.json(err));
    },

    // Actualizar un jugador por ID
    updatePlayer: (req, res) => {
        Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((jugador) => res.json(jugador))
            .catch((err) => res.json(err));
    },

    // Borrar un jugador por ID
    deletePlayer: (req, res) => {
        Player.deleteOne({ _id: req.params.id })
            .then((jugador) => res.json(jugador))
            .catch((err) => res.json(err));
    }
};