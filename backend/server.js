const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-sponsor', (req, res) => {
    const { companyName, contactPerson, contactEmail, contactPhone, sponsorshipCategory, message } = req.body;

    const sql = 'INSERT INTO sponsors (company_name, contact_person, contact_email, contact_phone, sponsorship_category, message) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [companyName, contactPerson, contactEmail, contactPhone, sponsorshipCategory, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to insert sponsor' });
        }
        res.status(200).json({ message: 'Sponsor added successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
