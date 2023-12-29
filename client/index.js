const express = require('express');
const app = express();
const route = require('./src/api')
const path = require('path');


const port = process.env.PORT || 3002;

app.use(express.json());
app.use('/api', route);

app.use(express.static(path.join(__dirname, 'src/public')));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})