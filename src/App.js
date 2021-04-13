import './App.css';
import React ,{useState,useEffect} from 'react'
import Qrreader from './QrReader'
// import Reader from './reader';

function App() {
  
  const [res,setRes] = useState('');
  const [video,setvideo] = useState(false)

  const handleError = (error) => {
    console.log(error)
  }

  const handleScan = (result) => {
    if(result)
    {
      console.log(result)
      setRes(res)
      window.location.replace(result);
    }
  }

  return (
    <div className="App">
      <div id="container" style={{width:"50%",height:'50%',margin:"auto"}}>
        <h1>QR Code Scanner</h1>
        <button className="btn" onClick={()=>{setvideo(!video)}}> CLick to Scan</button>
        {video ?<Qrreader error={handleError} scan={handleScan} res={res}/>:null}
      </div>
      {/* <Reader/> */}
    </div>
  );
}

export default App;
