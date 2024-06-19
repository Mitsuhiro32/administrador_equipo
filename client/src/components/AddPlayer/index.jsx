import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, FormGroup, Input, Label } from "reactstrap";
import PropTypes from "prop-types";

const AddPlayer = ({ addNewPlayer, URL_BASE }) => {
    const [nombre, setNombre] = useState('');
    const [posicion, setPosicion] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addPlayer = () => {
        const URL = `${URL_BASE}/player/new`;

        if (!nombre || !posicion) {
            setError('Por favor, ingrese un nombre y una posición.');
            return;
        }

        if (nombre.length < 2) {
            setError('El nombre debe tener al menos 2 caracteres.');
            return;
        }

        axios.post(URL, { nombre, posicion })
            .then((res) => {
                addNewPlayer(res.data);
                setNombre('');
                setPosicion('');
                setError('');
                navigate('/players/list');
            })
            .catch((err) => setError(err.message));
    }

    return (
        <>
            <Card color="dark" outline style={{ width: '800px' }}>
                <div className="buttons">
                    <Button color='info' outline onClick={() => navigate('/players/list')}>List</Button>
                    <Button color='info' outline active onClick={() => navigate('/players/create')}>Add Player</Button>
                </div>
                <h2>Agregar Jugador</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addPlayer();
                }}>
                    <FormGroup>
                        <Label for="name">Nombre: </Label>
                        <Input type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="position">Posición: </Label>
                        <Input type="text" name="posicion" id="posicion" value={posicion} onChange={(e) => setPosicion(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" color="success">Agregar</Button>
                </Form>
            </Card>
        </>
    )
}

AddPlayer.propTypes = {
    addNewPlayer: PropTypes.func.isRequired,
    URL_BASE: PropTypes.string.isRequired
};


export default AddPlayer