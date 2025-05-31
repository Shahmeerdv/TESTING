const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is up!');
});


// --- SPONSOR FORM: Submit new sponsor ---
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

// --- SPONSOR FORM: View all sponsors ---
app.get('/api/sponsors', (req, res) => {
    db.query('SELECT * FROM sponsors ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch sponsors' });
        }
        res.json(results);
    });
});

// --- SPONSOR FORM: Get sponsor by ID ---
app.get('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    db.query('SELECT * FROM sponsors WHERE id = ?', [sponsorId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching sponsor' });
        if (results.length === 0) return res.status(404).json({ error: 'Sponsor not found' });
        res.json(results[0]);
    });
});

// --- SPONSOR FORM: Update sponsor ---
app.put('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    const { companyName, contactPerson, contactEmail, contactPhone, sponsorshipCategory, message } = req.body;
    const sql = `
        UPDATE sponsors 
        SET company_name = ?, contact_person = ?, contact_email = ?, contact_phone = ?, sponsorship_category = ?, message = ? 
        WHERE id = ?
    `;
    db.query(sql, [companyName, contactPerson, contactEmail, contactPhone, sponsorshipCategory, message, sponsorId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update sponsor' });
        res.json({ message: 'Sponsor updated successfully' });
    });
});

// --- SPONSOR FORM: Delete sponsor ---
app.delete('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    db.query('DELETE FROM sponsors WHERE id = ?', [sponsorId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete sponsor' });
        res.json({ message: 'Sponsor deleted successfully' });
    });
});

// --- REGISTRATION FORM: Submit new registration ---
app.post('/submit-registration', (req, res) => {
    const {
        fullName,
        email,
        phone,
        institution,
        studentId,
        category,
        event,
        optionalEvent
    } = req.body;

    const sql = `
        INSERT INTO registrations 
        (full_name, email, phone, institution, student_id, category, event_name, optional_event)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [fullName, email, phone, institution, studentId, category, event, optionalEvent], (err, result) => {
        if (err) {
            console.error('Error inserting registration:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Registration successful');
    });
});

// --- Start the server ---
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
