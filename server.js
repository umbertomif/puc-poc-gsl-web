const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/nazox'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/nazox/index.html');
});

app.listen(PORT, () => {
    console.log('Serviço iniciado na porta' + PORT);
})