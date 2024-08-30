import React from 'react';
import { useSelector } from 'react-redux';

const DataTable = () => {
  const data = useSelector((state) => state.csvData.csvData);

  return (
    <div className="data-table">
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;