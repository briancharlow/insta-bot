require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const { postToInsta } = require('./api/cron.js');
// Middleware (if needed)
app.use(express.json()); // To parse JSON request bodies

// Example of a simple route
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Instagram posting app!');
});

app.get('/trigger-cron', async (req, res) => {
    try {
        await postToInsta();
        res.status(200).send('Post made successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error posting to Instagram');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});