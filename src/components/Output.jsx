import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Output = ({code, language}) => {
     const [output, setOutput] = useState('Press the Run Button to get the output');
     

  const  getOutput = async() => {
      console.log("code is: ", code);
      console.log("language is: ", language);
  };
  return (
    <div className='outputComponent'>
      <button className='outputBtn' onClick={getOutput}>Run Code</button>
       <h4>Output:</h4>
       <div className="outputText">
          {output}
       </div>
    </div>
  )
}

export default Output
