require("dotenv").config();
const express = require("express");
const cors = require("cors");
const RutasJugador = require("./routes/player.routes");
const PORT = process.env.PORT || "8000";

const app = express();

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

RutasJugador(app);

app.listen(8000, () => console.log(`El servidor está encendido en el puerto ${PORT}`));