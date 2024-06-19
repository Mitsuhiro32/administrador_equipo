import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Card } from 'reactstrap'
import PlayerTable from './components/PlayerTable'
import AddPlayer from './components/AddPlayer'
import PlayerStatus from './components/PlayerStatus'

function App() {
  const [players, setPlayers] = useState([]);
  const URL_BASE = 'http://localhost:8000/api';
  const navigate = useNavigate();

  const addNewPlayer = (player) => {
    setPlayers([...players, player]);
  }

  useEffect(() => {
    axios.get(`${URL_BASE}/players`)
      .then((res) => setPlayers(res.data))
      .catch((err) => console.log(err));
  }, [players]);

  return (
    <>
      <div className="buttons home">
        <Button color='primary' active={window.location.pathname.startsWith('/players')} onClick={() => navigate('/players/list')}>Manage Players</Button>
        <Button color='primary' active={window.location.pathname.startsWith('/player/status/game')} onClick={() => navigate('/player/status/game/1')}>Manage Player Status</Button>
      </div>
      <Routes>
        <Route path="/players/list" element={
          <Card color="dark" outline style={{ minWidth: '800px' }}>
            <div className="buttons">
              <Button color='info' outline active onClick={() => navigate('/players/list')}>List</Button>
              <Button color='info' outline onClick={() => navigate('/players/create')}>Add Player</Button>
            </div>
            <PlayerTable players={players} URL_BASE={URL_BASE} />
          </Card>
        } />
        <Route path="/players/create" element={<AddPlayer addNewPlayer={addNewPlayer} URL_BASE={URL_BASE} />} />
        <Route path="/player/status/game/1" element={<PlayerStatus players={players} URL_BASE={URL_BASE} />} />
      </Routes>
    </>
  )
}

export default App
