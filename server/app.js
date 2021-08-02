const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    const row = fs.readFileSync('server/info.json')
    let currency = JSON.parse(row)
    res.send(currency.exchangeRates)
})

app.listen(3000);