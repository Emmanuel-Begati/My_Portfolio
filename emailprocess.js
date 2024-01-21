const fs = require('fs');
const csv = require('csv-parser');

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
