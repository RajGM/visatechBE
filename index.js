require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//const PORT = process.env.PORT || 3001;
const PORT = 3001;

app.post('/submit', (req, res) => {
    console.log('Received form submission:', req.body);
    const { name, email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    res.json({ message: 'Form submitted successfully' });
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
