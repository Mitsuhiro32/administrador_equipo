import axios from "axios"
import PropTypes from "prop-types";
import { Button, Table } from "reactstrap";

const PlayerTable = ({ players, URL_BASE }) => {
    const deletePlayer = (id, nombre) => {
        const confirm = window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`);

        if (confirm) {
            axios.delete(`${URL_BASE}/player/delete/${id}`)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        }
    }

    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Posición</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <tr key={player._id}>
                        <td>{player.nombre}</td>
                        <td>{player.posicion}</td>
                        <td>
                            <Button color="danger" onClick={() => deletePlayer(player._id, player.nombre)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

PlayerTable.propTypes = {
    players: PropTypes.array.isRequired,
    URL_BASE: PropTypes.string.isRequired
};

export default PlayerTable