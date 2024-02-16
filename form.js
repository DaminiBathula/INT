const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// In-memory data store
let userData = [];

app.use(bodyParser.json());
app.use(cors()); 

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
        return res.status(400).send('All fields are required');
    }
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email format');
    }
    console.log('Successfully posted data:', { name, email, contact });
    // Store data
    userData.push({ name, email, contact });
        // console.log('Received data:Successfully');
    res.status(200).send('Successfully posted your data');
});


app.get('/entries', (req, res) => {
    console.log('Got data successfully');
    const numOfEntries = userData.length;
    res.json({numOfEntries, userData});
});

function isValidEmail(email) {
    // Basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
