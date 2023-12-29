const express = require('express');
const path = require('path');

const app = express();
const route = require('./src/api')

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', route);

app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

