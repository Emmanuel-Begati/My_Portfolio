const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const csvWriter = createCsvWriter({
    path: 'form_data.csv',
    header: [
        { id: 'your-name', title: 'Your Name' },
        { id: 'your-email', title: 'Your Email' },
        { id: 'your-message', title: 'Your Message' },
    ],
    append: true,
});

app.post('/send-email', (req, res) => {
    const { 'your-name': yourName, 'your-email': yourEmail, 'your-message': yourMessage } = req.body;

    const data = [{ 'your-name': yourName, 'your-email': yourEmail, 'your-message': yourMessage }];

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
