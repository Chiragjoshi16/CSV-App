const mongoURI = 'mongodb+srv://chirag:chirag123@cluster0.lkahcda.mongodb.net/csvDB?retryWrites=true&w=majority&appName=Cluster0';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.post('/insert-data', async (req, res) => {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    const database = client.db('csvDB');
    const collection = database.collection('custom-collection');

    const data = req.body;

    const result = await collection.insertMany(Array.isArray(data) ? data : [data]);

    res.status(200).send({ message: 'Data inserted successfully', insertedCount: result.insertedCount });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send({ message: 'Error inserting data', error: error.message });
  } finally {
    await client.close();
  }
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
