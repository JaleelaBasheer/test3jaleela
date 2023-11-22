import './App.css';
import { useState } from "react";
import * as XLSX from "xlsx";


function App() {
  
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }

  return (
     <div className="App">
      <div className="text-center w-100">
      <input className='btn btn-warning mt-3'
  type="file" 
  accept=".xlsx, .xls" 
  onChange={handleFileUpload} 
/>
       </div>   



{data.length > 0 && (
  <div className='ms-4 me-4 mt-4'>
    <table className="table table-borderless">
    <thead>
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  </div>
)}
 

<br /><br />
<p className='text-center fw-bold'>... designed by JaleelaBasheer ...</p>
</div>
);
     
 
}

export default App;
