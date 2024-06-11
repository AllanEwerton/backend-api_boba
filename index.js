const express = require('express');
const server = express();
const menu = require('./src/data/menu.json');
const { validate } = require('jsonschema');
const cors = require('cors'); // Importe o pacote cors

const schema = {
    type: 'object',
    properties: {
        menu: {
            type: 'object',
            properties: {
                pratos_principais: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            nome: { type: 'string' },
                            descricao: { type: 'string' },
                            preco: { type: 'number' },
                            url: { type: 'string' }
                        },
                        required: ['id', 'nome', 'descricao', 'preco', 'url']
                    }
                }
            },
            required: ['pratos_principais']
        }
    },
    required: ['menu']
};

// Use o middleware cors
server.use(cors());

server.get('/Menu', (req, res) => {
    try {
        // Realize a validação
        const validationResult = validate(menu, schema);
        if (validationResult.valid) {
            res.json(menu);
        } else {
            res.status(400).json({ error: 'O arquivo JSON não tem a estrutura esperada.', validationErrors: validationResult.errors });
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/Menu');
});
