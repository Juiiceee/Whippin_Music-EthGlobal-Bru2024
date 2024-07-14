const express = require('express');
const multer = require('multer');
const lighthouse = require('@lighthouse-web3/sdk');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Charger les variables d'environnement
require('dotenv').config();

const app = express();
const port = 3001;

// Assurez-vous que les variables d'environnement sont correctement chargées
const API_KEY ="c4ef9c26.f81010c9bd78405c854cb39058e12c89";
const SUPABASE_URL = "https://kgznrgbyewaxfgcznezy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnem5yZ2J5ZXdheGZnY3puZXp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDAxNzUzMywiZXhwIjoyMDM1NTkzNTMzfQ.MNv0_gvm9NNPCvJISwKUenzxGE_Z85JIZFPDLFzDZDQ";

if (!API_KEY || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('API_KEY, SUPABASE_URL, and SUPABASE_ANON_KEY must be set in .env.local');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.fields([{ name: 'song' }, { name: 'image' }]), async (req, res) => {
  try {
    const songFile = req.files.song[0];
    const imageFile = req.files.image[0];

    const songFilePath = path.join(__dirname, songFile.path);
    const imageFilePath = path.join(__dirname, imageFile.path);

    const songResponse = await lighthouse.upload(songFilePath, API_KEY);
    const imageResponse = await lighthouse.upload(imageFilePath, API_KEY);

    fs.unlinkSync(songFilePath);
    fs.unlinkSync(imageFilePath);

    const songUrl = `https://gateway.lighthouse.storage/ipfs/${songResponse.data.Hash}`;
    const imageUrl = `https://gateway.lighthouse.storage/ipfs/${imageResponse.data.Hash}`;

    const { author, title, userId } = req.body;

    const { data, error } = await supabase
      .from('songs')
      .insert([{ user_id: userId, author, title, song_path: songUrl, image_path: imageUrl }]);

    if (error) {
      throw new Error(error.message);
    }

    res.json({
      songUrl,
      imageUrl,
      data
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
