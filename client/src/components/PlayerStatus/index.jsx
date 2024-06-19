import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button, Card, Table } from "reactstrap";

const PlayerStatus = ({ players, URL_BASE }) => {
    const navigate = useNavigate();

    const changeStatus = (id, estado) => {
        axios.put(`${URL_BASE}/player/edit/${id}`, { estado })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Card color="dark" outline style={{ width: '800px' }}>
                <h2>Players Status</h2>
                <div className="buttons">
                    <Button color='info' outline active onClick={() => navigate('/player/status/game/1')}>Juego 1</Button>
                    {/* <Button color='info' outline onClick={() => navigate('/player/status/game/2')}>Juego 2</Button>
                    <Button color='info' outline onClick={() => navigate('/player/status/game/3')}>Juego 3</Button> */}
                </div>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player._id}>
                                <td>{player.nombre}</td>
                                <td>
                                    <div className="buttons">
                                        <Button color={player.estado === 'Jugando' ? 'success' : 'secondary'} onClick={() => changeStatus(player._id, 'Jugando')}>Jugando</Button>
                                        <Button color={player.estado === 'No Juega' ? 'danger' : 'secondary'} onClick={() => changeStatus(player._id, 'No Juega')}>No Juega</Button>
                                        <Button color={player.estado === 'Indeciso' ? 'warning' : 'secondary'} onClick={() => changeStatus(player._id, 'Indeciso')}>Indeciso</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

PlayerStatus.propTypes = {
    players: PropTypes.object.isRequired,
    URL_BASE: PropTypes.string.isRequired
};

export default PlayerStatus