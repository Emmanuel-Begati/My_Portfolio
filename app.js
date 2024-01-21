const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const csvFilePath = 'form_data.csv';

const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'Name', title: 'Name' },
        { id: 'Email', title: 'Email' },
        { id: 'Message', title: 'Message' },
    ],
    append: true,
});

// Check if the file exists
if (!fs.existsSync(csvFilePath)) {
    // If the file doesn't exist, write the header row
    csvWriter.writeRecords([{ Name: 'Name', Email: 'Email', Message: 'Message' }])
        .then(() => {
            console.log('Header row added to CSV file');
        })
        .catch((error) => {
            console.error('Error adding header row to CSV file:', error);
        });
}

app.post('/send-email', (req, res) => {
    const { 'your-name': yourName, 'your-email': yourEmail, 'your-message': yourMessage } = req.body;

    const data = [{ Name: yourName, Email: yourEmail, Message: yourMessage }];

    // Write the data
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Data added to CSV file');
            res.status(200).send('Data added to CSV file');
        })
        .catch((error) => {
            console.error('Error adding data to CSV file:', error);
            res.status(500).send('Error adding data to CSV file');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
