const express = require('express');
const app = express();
const route = require('./src/api')

const port = process.env.PORT || 3002;

app.use(express.json());
app.use('/api', route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})