CREATE DATABASE IF NOT EXISTS event_horizon;

USE event_horizon;

CREATE TABLE IF NOT EXISTS sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    sponsorship_category VARCHAR(50) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
<<<<<<< HEAD
<<<<<<< HEAD
);
=======
=======
>>>>>>> 16c9237c3733ab5623153134e6829d1b6405cfa0
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    institution VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    category ENUM('technical', 'nontechnical') NOT NULL,
    event_name VARCHAR(100),
    optional_event VARCHAR(100),  -- Optional event dropdown field
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
<<<<<<< HEAD
>>>>>>> bef1326b15e51f6523d49b4ae1ae712c42082245
=======
>>>>>>> 16c9237c3733ab5623153134e6829d1b6405cfa0
