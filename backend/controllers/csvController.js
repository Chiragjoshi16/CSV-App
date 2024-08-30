const User = require('../models/User');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;


const uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const userId = req.user._id;
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await User.updateOne(
          { _id: ObjectId(userId) },
          { $set: { csvData: results } },
          { upsert: true }
        );
        log
        res.status(200).json({ message: 'File uploaded and data saved successfully', data: results });
      } catch (error) {
        res.status(500).json({ message: 'Error saving CSV data', error });
      }
    });
};

const getCsvData = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user.csvData || []);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving CSV data', error });
  }
};

const updateRow = async (req, res) => {
  const userId = req.user._id;
  const { data } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.csvData = data;
      await user.save();
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
};

const exportCsv = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (user && user.csvData) {
      const filePath = path.join(__dirname, 'exportedData.csv');
      const ws = fs.createWriteStream(filePath);

      ws.write(Object.keys(user.csvData[0]).join(',') + '\n');

      user.csvData.forEach((row) => {
        ws.write(Object.values(row).join(',') + '\n');
      });

      ws.end(() => {
        res.download(filePath, 'exportedData.csv', (err) => {
          if (err) {
            res.status(500).json({ message: 'Error exporting CSV data', error: err });
          }
        });
      });
    } else {
      res.status(404).json({ message: 'No data found to export' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error exporting CSV data', error });
  }
};

module.exports = {
  uploadCsv,
  getCsvData,
  updateRow,
  exportCsv,
};


