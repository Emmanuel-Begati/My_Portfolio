const express = require('express');
const path = require('path');
const fs = require('fs');
// const csvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Define the route for handling the POST request
app.post('/send-email', (req, res) => {
    const { email } = req.body;

    // Append the email to the CSV file
    const csvWriter = createCsvWriter({
        path: 'emails.csv',
        header: [{ id: 'email', title: 'Email' }]
    });

    csvWriter.writeRecords([{ email }])
        .then(() => {
            console.log('Email added to CSV file');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error adding email to CSV file:', error);
            res.sendStatus(500);
        });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
