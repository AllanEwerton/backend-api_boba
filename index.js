const express = require('express');
const server = express();
const menu = require('./src/data/menu.json');
const cors = require('cors'); // Importe o pacote cors
// Use o middleware cors
server.use(cors());

server.get('/Menu', (req, res) => {
            res.json(menu);
        })
        
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/Menu');
});
