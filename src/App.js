import { useEffect, useState } from 'react';
import './App.css';
import jsonData from "./data/data.json";



function App() {
  const [data,setData]= useState();
  const importData = () => {
    setData(jsonData);
  }

  useEffect(()=>{
    importData();
  }, [])

  useEffect(() => {
    console.log("data", data);
  }, [data])

  return (
    <div className="App">
      {data && data.comments && data.comments.map((element, index)=>(
        <div>
          <div className='content' key={index}>{element.content}</div>
          <div className='createdAt'>{element.createdAt}</div>
          <div>
            <img className='userImage' src={element.user.image.png}/>
            <div className='username'>{element.user.username}</div>
          </div>
          <div className='score'>{element.score}</div>
          <div className='reply'><span>R</span> Reply</div>
        </div>
              )
      )
      }
    </div>
  );
}

export default App;
