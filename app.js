const express = require('express');
const path = require('path');
const { createObjectCsvWriter, writeRecords } = require('csv-writer');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Use middleware to parse form data

// Define the CSV file path
const csvFilePath = 'emails.csv';

// Create the CSV writer with header if the file doesn't exist
const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'message', title: 'Message' }
    ]
});

// Create the CSV file with header if it doesn't exist
// csvWriter.writeRecords([{ name: 'example', email: 'example@example.com', message: 'Hello, world!' }]);

app.post('/send-email', async (req, res) => {
    const { 'your-name': name, 'your-email': email, 'your-message': message } = req.body;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    try {
        // Append new record to the existing CSV file
        await writeRecords([{ name, email, message }], { header: false, append: true, path: csvFilePath });
        console.log('Data added to CSV file');
        res.sendStatus(200);
    } catch (error) {
        console.error('Error adding data to CSV file:', error);
        res.sendStatus(500);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
