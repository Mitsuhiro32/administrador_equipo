const playerController = require('../controllers/player.controller');

module.exports = (app) => {
    app.post('/api/player/new', playerController.createPlayer);
    app.get('/api/players', playerController.getAllPlayers);
    app.get('/api/player/:id', playerController.getPlayerById);
    app.put('/api/player/edit/:id', playerController.updatePlayer);
    app.delete('/api/player/delete/:id', playerController.deletePlayer);
}