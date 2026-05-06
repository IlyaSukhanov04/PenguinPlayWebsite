import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Schemas
const waitlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const suggestionSchema = new mongoose.Schema({
  suggestion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);
const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// API Routes
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    const newEntry = new Waitlist({ email });
    await newEntry.save();
    res.status(201).json({ message: 'Added to the huddle!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'You are already in the huddle!' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/suggestion', async (req, res) => {
  try {
    const { suggestion } = req.body;
    if (!suggestion) return res.status(400).json({ error: 'Suggestion is required' });
    
    const newSuggestion = new Suggestion({ suggestion });
    await newSuggestion.save();
    res.status(201).json({ message: 'Thanks for the suggestion!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
