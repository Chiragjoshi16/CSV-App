import React, { useState } from 'react';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { setCsvData, saveCsvData } from '../redux/actions/csvActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ExportButton from './ExportButton';
import { useNavigate } from 'react-router-dom';
import '../styles/CsvUpload.css';

const CsvUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editableData, setEditableData] = useState([]);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('A CSV file is required'),
    }),
    onSubmit: (values) => {
      const { file } = values;
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const filteredData = result.data.filter(row => 
            Object.values(row).some(value => value.trim() !== '')
          );
          setEditableData(filteredData);
          dispatch(setCsvData(filteredData));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  });

  const handleInputChange = (index, key, value) => {
    const updatedData = [...editableData];
    updatedData[index][key] = value;
    setEditableData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = Object.keys(editableData[0]).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setEditableData([...editableData, newRow]);
  };

  const handleSave = async () => {
    try {
      await dispatch(saveCsvData(editableData));
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleExport = () => {
    try {
      const csv = Papa.unparse(editableData); 
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="csv-upload">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h2>Upload CSV</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="file"
          accept=".csv"
          name="file"
          onChange={(event) => {
            formik.setFieldValue('file', event.currentTarget.files[0]);
          }}
        />
        {formik.errors.file && formik.touched.file && <div>{formik.errors.file}</div>}
        <button type="submit">Upload</button>
      </form>

      {editableData.length > 0 && (
        <div>
          <h3>CSV Data</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(editableData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {editableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((key) => (
                    <td key={key}>
                      <input
                        type="text"
                        value={row[key]}
                        onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddRow}>Add New Row</button>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}

      <ExportButton onExport={handleExport}/>
    </div>
  );
};

export default CsvUpload;
