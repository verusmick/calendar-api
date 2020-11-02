const express = require('express');
require('dotenv').config();

// create express server
const app = express();

// Public
app.use(express.static('public'));

// Endpoints
app.use('/api/auth', require('./routes/auth'));




// listen requaries

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});
