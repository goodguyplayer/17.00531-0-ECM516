const express = require ('express');
const app = express();
app.use(express.json());
const axios = require('axios');

app.post('/eventos', (req, res) => {
    const evento = req.body;
    console.log(evento);

    // Envia evento para microserviço lembretes
    axios.post('https://localhost:4000/eventos', evento);

    // Envia evento para microserviço observações
    axios.post('https://localhost/5000/eventos', evento);

    res.status(200).send({msg: 'ok'});
});

app.listen(10000, () => console.log('Microsserviços Event Bus, Porta 10000'));