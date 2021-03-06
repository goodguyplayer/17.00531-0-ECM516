const express = require ('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());

const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
  //res.status(200).send({"resultado": "OK"});
  res.send(lembretes);
});

app.put ('/lembretes', async (req, res) => {
  //{texto: "Fazer cafe"}
  const { texto }  = req.body;
  contador++;
  lembretes[contador] = {
    contador, texto
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: "LembreteCriado",
    dados: { contador, texto}
  });
  res.status(201).send(lembretes[contador]);
});

app.post('/eventos', (req, res) =>{
  console.log(req.body);
  res.status(200).send({msg: 'ok'});
})

app.listen(4000, () => {
  console.log("Microsserviço de lembretes executando na porta 4000.")
});