const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const csvFilePath = 'form_data.csv';

// An array to store submitted data
const submittedData = [];

const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'Name', title: 'Name' },
        { id: 'Email', title: 'Email' },
        { id: 'Message', title: 'Message' },
    ],
    append: true,
});

app.post('/send-email', (req, res) => {
    const { 'your-name': yourName, 'your-email': yourEmail, 'your-message': yourMessage } = req.body;

    // Check if a record with the same name or email already exists
    const duplicateRecord = submittedData.find(entry => entry.Name === yourName || entry.Email === yourEmail);

    if (duplicateRecord) {
        // Return a message indicating that the user has already submitted a form
        return res.status(400).json({ success: false, message: 'You have already submitted a form.' });
    }

    const data = [{ Name: yourName, Email: yourEmail, Message: yourMessage }];

    // Write the data to CSV and store it in the array
    csvWriter.writeRecords(data)
        .then(() => {
            submittedData.push(data[0]);

            console.log('Data added to CSV file');
            res.status(200).json({ success: true, message: 'Data added to CSV file' });
        })
        .catch((error) => {
            console.error('Error adding data to CSV file:', error);
            res.status(500).json({ success: false, message: 'Error adding data to CSV file' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
