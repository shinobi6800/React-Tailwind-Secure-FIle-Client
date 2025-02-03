import { useState } from 'react'
import {FaFileUpload , FaFile} from "react-icons/fa"

import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [uploading,setUploading] =useState(false);
  const [status,setStatus]=useState("Nothing going on here...")
  let upload = async ()=>{
   try{
     if(!file){
      setStatus("You didnt Select a File");
      return;
     }
     setStatus("Uploading File")
     let formData= new FormData();
     formData.append("file",file);
     let req= await fetch("http://localhost:3000/securefile/upload",{method:"POST",body:formData});
     console.log(req)
     let resp=await req.json();
     setStatus(resp.message);
     
   }catch(err){
    if(err){
      console.log(err.message);
      setStatus(err.message)
    }
   
  }finally{
    setStatus();
    setploading()
  }
  }
  
  return (
    <>
     <nav className='p-7  text-white font-extrabold text-2xl text-center '>SECURE FILE REDONE</nav>
    <section className=' m-2 bg-slate-200 p-5 rounded-lg p-2w-full h-1/2 flex  items-center flex-col'>
      <h1 className='font-bold text-2xl m-2 text-center '>{status}</h1>
       <div>
        <input type="file" name='file' className='bg-blue-500 p-4 text-white m-2 rounded-lg font-bold shadow-lg' onChange={(e)=>{setFile(e.target.files[0]),setStatus("You selected a file")}}/>
         {file ? <button className='p-2 bg-green-500 text-white w-1/2 m-1 rounded-xl shadow-lg text-lg text-center font-bold' onClick={upload}>Upload</button> : ""}
       </div>
    </section>
    <section className='w-full '>
       <div className='text-white font-bold text-lg p-3 m-5'>{file ? 
      <div className='flex justify-center item-center bg-slate-600 p-4 rounded-lg'>
        <span>Upload It</span>
        <FaFileUpload className='w-7 h-7' />
      </div> : <div className='flex justify-center item-center bg-red-600 p-4 rounded-lg'>
        <span>Select a File</span>
        <FaFile className='w-7 h-7' />
      </div> }</div>
    </section>
    </>
  )
}

export default App
