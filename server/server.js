const express = require('express');
const mysql = require('mysql');

const cors = require('cors');

const app = express();
const port = 3001; 

app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: 'Yarab1!!',
  database: 'pet'
});

connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database');
    }
  });

 // ADD a user 
 app.post('/signUp', (req, res) => {
  const { gmail } = req.body;

  if (!gmail) {
    return res.status(400).json({ error: 'Missing gmail in request body' });
  }

  const sql = 'INSERT INTO user (gmail) VALUES (?)';
  connection.query(sql, [gmail], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).json({ error: 'Error adding user' });
    } else {
      console.log('User added successfully');
      res.status(200).json({ message: 'User added successfully' });
    }
  });
});
 // Fetch all pets
app.get('/pets', (req, res) => {
    const sql = 'SELECT * FROM pet';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });

//signin
app.get('/signIn', (req, res) => {
  const sql = 'SELECT * FROM user WHERE gmail = ? ';
  const { gmail } = req.query;
  connection.query(sql,[gmail], (err, result) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Error retrieving user' });
    }
    res.json(result);
  });
});
 //ADDpet 
 app.post('/addPet', (req, res) => {
  const { user_id, type, race, picture, name, description, contact } = req.body;

  if (!user_id || !type || !race || !picture || !name || !description || !contact) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  const sql = 'INSERT INTO pet (user_id, type, race, name, description, contact, picture) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [user_id, type, race, name, description, contact, picture], (err, result) => {
    if (err) {
      console.error('Error adding pet:', err);
      res.status(500).json({ error: 'Error adding pet' });
    } else {
      console.log('Pet added successfully');
      res.status(200).json({ message: 'Pet added successfully' });
    }
  });
});
//ADDveterinary
app.post('/addVeterinary', (req, res) => {
  const { user_id, name, description, gmail,phone, adresse,picture } = req.body;

  if (!user_id  || !picture || !name || !description || !gmail || !phone || !adresse) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  const sql = 'INSERT INTO veterinary(user_id, name, description, gmail,phone,adresse, picture) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [user_id, name, description, gmail,phone,adresse, picture], (err, result) => {
    if (err) {
      console.error('Error adding veterinary:', err);
      res.status(500).json({ error: 'Error adding veterinary' });
    } else {
      console.log('veterinary added successfully');
      res.status(200).json({ message: 'veterinary added successfully' });
    }
  });
});
// get mypets

app.get('/mypets', (req, res) => {
  const { user_id } = req.query;
  const sql = 'SELECT * FROM pet WHERE user_id = ?';
  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// get my veterinary
app.get('/isVeterinary', (req, res) => {
  const { user_id } = req.query;
  const sql = 'SELECT * FROM veterinary WHERE user_id = ?';
  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
// fetch all veterinarians
app.get('/veterinarians', (req, res) => {
  const sql = 'SELECT * FROM veterinary';
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
 