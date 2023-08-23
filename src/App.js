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
      <main>
        {data && data.comments && data.comments.map((element, index)=>(
          <div className='comment__container' key={index}>
            <div className='contentComment' >{element.content}</div>
            <div className='createdAt'>{element.createdAt}</div>
            <div className='user'>
              <img className='userImage' src="https://images.pexels.com/photos/16628785/pexels-photo-16628785/free-photo-of-moda-amor-mujer-oscuro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='avatar'/>
              <div className='username'>{element.user.username}</div>
            </div>
            <div className='score'><span className='plus'></span>{element.score}<span className='minus'></span></div>
            <div className='reply'><span className='replyIcon'></span> Reply</div>
          </div>
                )
        )
        }
      </main>
    </div>
  );
}

export default App;
