import React,{ Suspense,useState } from "react";
import {getValidationCode,validateAccessCode} from './action/AccessCodeAction'

import "./App.css";

const App = () => {
  const [phoneNumber,setPhoneNumber] = useState('');
  const [accessCode,setAccessCode] = useState('');
  const [showAccessCode,setAccessC] = useState('')
  const getAccessCode = async ()=>{
    if (!phoneNumber) return ;
    
    try {
      const accesscode = await getValidationCode(phoneNumber)
      setAccessC(accesscode)
    } 
    catch (err) {
      console.log(err)
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    if (!(accessCode&&phoneNumber&&showAccessCode)) {
      alert('Need input');
      return ;
    }

    try {
      await validateAccessCode(phoneNumber,accessCode)
    } 
    catch (err) {
      console.log(err)
    }
  }
  return (
    // <ScreenSyllabus />
    <div className="App">
      <Suspense fallback={<h1>Loading....</h1>}>
        <div>
            <h2 style={{textAlign:'center'}}>Coding Challenge Interview</h2>
            <form style={style.main} onSubmit={handleSubmit}>
              <label style={{textAlign:'center'}}>Phone Number</label>
              <input type='tel' required onChange={(e)=>setPhoneNumber(e.target.value)} />
              <button type='button' onClick={getAccessCode}>Get Access Code</button>
              <label style={{textAlign:'center',marginTop:'3vh'}}>Access Code</label>
              {showAccessCode?<h5 style={{textAlign:'center'}}>{showAccessCode}</h5>:null}
              <input type='text' required onChange={(e)=>setAccessCode(e.target.value)}/>
              <input type='submit' value='Validation'/>

            </form>
        </div>
        
      </Suspense>
    </div>
  );
}

export default App;
//

const style={
  main:{
    display:'flex',
    flexDirection:'column',
    
    marginTop:'15vh'
    
  }
}