import React, {useState} from 'react'
import * as XLSX from 'xlsx';

function Examples() {
    const [transformedData, setTransformedData] = useState([]);
    const [excelData, setExcelData] = useState([]);

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
    };
    const transformed = [];
    const transformData = () => {
      const numRows = excelData.length;
      const numCols = excelData[0].length;
      console.log(numRows);
      console.log(numCols);

  
      for (let i = 1; i < numRows; i++) {
        for (let j = 1; j < numCols; j++) {
          const item = excelData[i][j];
          if (item) {
            const size1 = excelData[0][i];
            const size2 = excelData[j][0] 
            const itemDes = getItemDescription(item); // You'll need to define this function
            transformed.push({ size1, size2, item, itemDes });
          }
        }
      }
  setTransformedData(transformed)
      // Log or set the transformed data in state, depending on your use case
      console.log(transformed);
    };
  
    const getItemDescription = (item) => {
      
      if (item === 'WOL' ) return 'Weldot';
      if (item === 'WRT' ) return 'Reducing tee';
      if (item === 'WT' ) return 'Straight tee';
      if (item === 'TR' ) return 'Reducing tee';
      if (item === 'TOL' ) return 'Threadolet';
      if (item === 'WOF' ) return 'Reinforcednipoflange';

  
      // Default value if no match found
      return 'Unknown';
    };
   
  

  return (
    <div>
      <h2 className="text-primary text-center">BRANCH TABLE</h2>
        <div className='m-5'>
        <input type="file" accept=".xlsx, .xls" className='btn btn-warning mt-3' onChange={handleFileUpload} />
      <button className='btn btn-success ms-3 mt-3' onClick={transformData}>Transform Data</button>
      {/* Display the transformed data in a table */}
      <table className='table'>
        <thead>
          <tr>
            <th>size1</th>
            <th>size2</th>
            <th>item</th>
            <th>itemdes</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over transformedData and render rows */}
          {/* Your code to map over transformed data and display rows */}
          {transformedData.map((row, index) => (
            <tr key={index}>
              <td>{row.size1}</td>
              <td>{row.size2}</td>
              <td>{row.item}</td>
              <td>{row.itemDes}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
        
      
    </div>
  )
}

export default Examples