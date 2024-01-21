const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
