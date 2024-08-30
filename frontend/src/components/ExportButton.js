import React from 'react';

const ExportButton = ({ onExport }) => {
  return (
    <button onClick={onExport}>Export Data</button>
  );
};

export default ExportButton;
