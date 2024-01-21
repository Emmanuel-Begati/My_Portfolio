const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const appendToCSV = require('./emailprocess');

// Function to append data to the CSV file
function appendToCSV(data) {
    const csvData = `${data.name},${data.email}\n`;

    fs.appendFile('emails.csv', csvData, (err) => {
        if (err) {
            console.error('Error appending to CSV file:', err);
        } else {
            console.log('Data appended to CSV file successfully!');
        }
    });
}

module.exports = appendToCSV;
const app = express();
// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /send-email endpoint
app.post('/send-email', (req, res) => {
    const formData = req.body;
    appendToCSV(formData);
    res.send('Email sent successfully!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
