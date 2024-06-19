const mongoose = require("mongoose");

const JugadorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del jugador es requerido"],
        minlength: [2, "El nombre del jugador debe tener al menos 2 caracteres"]
    },
    posicion: {
        type: String,
        required: [true, "La posición del jugador es requerida"]
    },
    estado: {
        type: String,
        required: [true, "El estado del jugador es requerido"],
        default: "Indeciso"
    }
}, { timestamps: true });

module.exports = mongoose.model("Jugador", JugadorSchema);