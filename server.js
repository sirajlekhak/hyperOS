import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file
const phonesFilePath = path.join(__dirname, 'phones.json');

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
  res.sendFile(path.join(__dirname, 'favicon.ico'));
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
