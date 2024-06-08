const express = require('express');
const server = express();
const menu = require('./src/data/menu.json')
server.get('/Menu', (req,res) =>{
    return res.json(menu);
});


server.listen(3000, () =>{
    console.log('Ok.')
})