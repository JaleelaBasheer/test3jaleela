import './App.css';
import { useState } from "react";
import * as XLSX from "xlsx";


function App() {

  const [excelData, setExcelData] = useState([]);
    const [excelData1, setExcelData1] = useState([]);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming first sheet for simplicity, change as needed
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Parse data
      const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Update state with parsed data
      setExcelData(parsedData);
    };

    reader.readAsArrayBuffer(file);
  }




  return (
     <div className="App">
      <h3 className="text-center mt-4 mb-3">Prepare a Excel parser to list all items reading this table and store the data in the table</h3>
      <div className="text-center ps-5 pe-5 w-100">
      <input className='btn btn-warning mt-3'
  type="file" 
  accept=".xlsx, .xls" 
  onChange={handleFileUpload} 
/>
<table >
        <thead>
          <tr>
            {excelData.length > 0 &&
              excelData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {excelData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>


       </div> 
       


 

<br /><br />
<p className='text-center fw-bold'>... designed by JaleelaBasheer ...</p>

</div>

); 
}

export default App;
