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


// --- SPONSORS ---

// Create new sponsor
app.post('/submit-sponsor', (req, res) => {
    const {
        companyName,
        contactPerson,
        contactEmail,
        contactPhone,
        sponsorshipCategory,
        message
    } = req.body;

    const sql = `
        INSERT INTO sponsors 
        (company_name, contact_person, contact_email, contact_phone, sponsorship_category, message)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [companyName, contactPerson, contactEmail, contactPhone, sponsorshipCategory, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to insert sponsor' });
        }
        res.status(200).json({ message: 'Sponsor added successfully' });
    });
});

// Get all sponsors
app.get('/api/sponsors', (req, res) => {
    db.query('SELECT * FROM sponsors ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch sponsors' });
        res.json(results);
    });
});

// Get sponsor by ID
app.get('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    db.query('SELECT * FROM sponsors WHERE id = ?', [sponsorId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching sponsor' });
        if (results.length === 0) return res.status(404).json({ error: 'Sponsor not found' });
        res.json(results[0]);
    });
});

// Update sponsor
app.put('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    const {
        companyName,
        contactPerson,
        contactEmail,
        contactPhone,
        sponsorshipCategory,
        message
    } = req.body;

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

// Delete sponsor
app.delete('/api/sponsors/:id', (req, res) => {
    const sponsorId = req.params.id;
    db.query('DELETE FROM sponsors WHERE id = ?', [sponsorId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete sponsor' });
        res.json({ message: 'Sponsor deleted successfully' });
    });
});


// --- REGISTRATIONS ---

// Submit new registration
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

// Get all registrations
app.get('/api/registrations', (req, res) => {
    db.query('SELECT * FROM registrations ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Error fetching registrations:', err);
            return res.status(500).json({ error: 'Failed to fetch registrations' });
        }
        res.json(results);
    });
});

// Get registration by ID
app.get('/api/registrations/:id', (req, res) => {
    const registrationId = req.params.id;
    db.query('SELECT * FROM registrations WHERE id = ?', [registrationId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching registration' });
        if (results.length === 0) return res.status(404).json({ error: 'Registration not found' });
        res.json(results[0]);
    });
});

// Update registration
app.put('/api/registrations/:id', (req, res) => {
    const registrationId = req.params.id;
    const {
        full_name,
        email,
        phone,
        institution,
        student_id,
        category,
        event_name,
        optional_event
    } = req.body;

    const sql = `
        UPDATE registrations 
        SET full_name = ?, email = ?, phone = ?, institution = ?, student_id = ?, category = ?, event_name = ?, optional_event = ?
        WHERE id = ?
    `;

    db.query(sql, [full_name, email, phone, institution, student_id, category, event_name, optional_event, registrationId], (err) => {
        if (err) {
            console.error('Error updating registration:', err);
            return res.status(500).json({ error: 'Failed to update registration' });
        }
        res.json({ message: 'Registration updated successfully' });
    });
});

// Delete registration
app.delete('/api/registrations/:id', (req, res) => {
    const registrationId = req.params.id;
    db.query('DELETE FROM registrations WHERE id = ?', [registrationId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete registration' });
        res.json({ message: 'Registration deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`🟢 Server running at http://localhost:${PORT}`);
});