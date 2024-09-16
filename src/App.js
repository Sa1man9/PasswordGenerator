import "./App.css";
import { useCallback, useEffect, useState,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber,setIsNumber]=useState(false);
  const [isCharacters,setIsCharacters]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if(isNumber){
      str +="1234567890"
    }
    if(isCharacters){
      str+="`~!@#$%^&*()-_=+[]\{}|;':<>?,./"
    }
    for(let i=1;i<=length;i++){
      let index=Math.floor(Math.random()*str?.length +1);
      pass+=str[index];
    }
    setPassword(pass)
  },[length,isCharacters,isNumber,setPassword])

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[isNumber,length,isCharacters,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input type="text" value={password} 
            className="outline-none w-full py-1 px-3"
            placeholder="passowrd"
            readOnly
            ref={passwordRef}
           />
           <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 " 
           onClick={copyPassword}
           >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={20}
            value={length} 
            className="cursor-pointer"
            onChange={(e)=>setLength(e.target.value)}/>
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="number"
              defaultChecked={isNumber}
              onChange={()=>{
                setIsNumber(!isNumber)
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="char"
              defaultChecked={isCharacters}
              onChange={()=>{
                setIsCharacters(!isCharacters)
              }}
            />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

