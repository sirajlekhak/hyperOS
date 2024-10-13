import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload'; // Import file upload middleware

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload()); // Enable file upload

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file (in the public directory)
const phonesFilePath = path.join(__dirname, 'public', 'phones.json');

// Helper function to read phones from JSON file
const readPhonesFromFile = () => {
  if (!fs.existsSync(phonesFilePath)) {
    throw new Error('Phones file not found');
  }

  const data = fs.readFileSync(phonesFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write phones to JSON file
const writePhonesToFile = (phones) => {
  fs.writeFileSync(phonesFilePath, JSON.stringify(phones, null, 2));
};

// Serve favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Default route for root path
app.get('/', (req, res) => {
  res.send('Welcome to the HyperOS Phone Management API. Use /phones to access phone data.');
});

// GET all phones
app.get('/phones', (req, res) => {
  try {
    const phones = readPhonesFromFile();
    res.json(phones);
  } catch (error) {
    console.error('Error reading phones:', error);
    res.status(500).json({ error: 'Failed to read phone data' });
  }
});

// POST a new phone
app.post('/phones', (req, res) => {
  try {
    const phones = readPhonesFromFile();
    const newPhone = { ...req.body };
    phones.push(newPhone);
    writePhonesToFile(phones);
    res.status(201).json(newPhone);
  } catch (error) {
    console.error('Error adding phone:', error);
    res.status(500).json({ error: 'Failed to add phone' });
  }
});

// PUT (update) a phone
app.put('/phones/:id', (req, res) => {
  try {
    const phones = readPhonesFromFile();
    const { id } = req.params;
    const index = phones.findIndex(phone => phone.id === id);

    if (index !== -1) {
      phones[index] = { ...phones[index], ...req.body };
      writePhonesToFile(phones);
      res.json(phones[index]);
    } else {
      res.status(404).send('Phone not found');
    }
  } catch (error) {
    console.error('Error updating phone:', error);
    res.status(500).json({ error: 'Failed to update phone' });
  }
});

// DELETE a phone
app.delete('/phones/:id', (req, res) => {
  try {
    const phones = readPhonesFromFile();
    const { id } = req.params;
    const filteredPhones = phones.filter(phone => phone.id !== id);

    if (phones.length !== filteredPhones.length) {
      writePhonesToFile(filteredPhones);
      res.status(204).send(); // No content
    } else {
      res.status(404).send('Phone not found');
    }
  } catch (error) {
    console.error('Error deleting phone:', error);
    res.status(500).json({ error: 'Failed to delete phone' });
  }
});

// Upload and replace phones.json
app.post('/upload-phones', (req, res) => {
  if (!req.files || !req.files.phones) {
    return res.status(400).send('No file was uploaded.');
  }

  const uploadedFile = req.files.phones; // Uploaded file object

  // Check for JSON file type
  if (uploadedFile.mimetype !== 'application/json') {
    return res.status(400).send('Uploaded file must be a JSON file.');
  }

  const filePath = phonesFilePath; // Path to replace phones.json

  // Move the uploaded file to replace the current phones.json
  uploadedFile.mv(filePath, (err) => {
    if (err) {
      console.error('Error replacing phones.json:', err);
      return res.status(500).send('Failed to replace phones.json');
    }

    // After successfully replacing the file, send the updated phones data
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading new phones.json:', err);
        return res.status(500).send('Failed to read new phones.json');
      }

      try {
        const jsonData = JSON.parse(data); // Parse the JSON data
        res.json(jsonData); // Send back the updated data
      } catch (jsonError) {
        console.error('Error parsing new phones.json:', jsonError);
        return res.status(400).send('Invalid JSON format');
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
