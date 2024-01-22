const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const csvFilePath = 'form_data.csv';

const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'Name', title: 'Name' },
        { id: 'Email', title: 'Email' },
        { id: 'Message', title: 'Message' },
        { id: 'Timestamp', title: 'Timestamp' },
    ],
    append: true,
});

// Check if the file exists
if (!fs.existsSync(csvFilePath)) {
    // If the file doesn't exist, write the header row
    csvWriter.writeRecords([{ Name: 'Name', Email: 'Email', Message: 'Message', Timestamp: 'Timestamp' }])
        .then(() => {
            console.log('Header row added to CSV file');
        })
        .catch((error) => {
            console.error('Error adding header row to CSV file:', error);
        });
}

// Initialize Telegram bot
const telegramBotToken = '6722579280:AAF0ESZWR7qifS0EFNAoFuyQfSxM4rMCSPs';
const telegramChatId = '6801523118';
const bot = new TelegramBot(telegramBotToken, { polling: false });

app.post('/send-email', (req, res) => {
    const { 'your-name': yourName, 'your-email': yourEmail, 'your-message': yourMessage } = req.body;

    const timestamp = new Date().toLocaleString(); // Get the current timestamp in a readable format

    const data = [{ Name: yourName, Email: yourEmail, Message: yourMessage, Timestamp: timestamp }];

    // Write the data
    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Data added to CSV file');
            res.status(200).send('Data added to CSV file');

            // Send message to Telegram
            const message = `New message received:\nName: ${yourName}\nEmail: ${yourEmail}\nMessage: ${yourMessage}\nTimestamp: ${timestamp}`;
            bot.sendMessage(telegramChatId, message);
        })
        .catch((error) => {
            console.error('Error adding data to CSV file:', error);
            res.status(500).send('Error adding data to CSV file');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
