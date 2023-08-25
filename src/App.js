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
          <>
            <div className='comment__container' key={index}>
              <div className='contentComment' >{element.content}</div>
              <div className='createdAt'>{element.createdAt}</div>
              <div className='user'>
                <img className='userImage' src={element.user.image.webp} alt='avatar'/>
                <div className='username'>{element.user.username}</div>
              </div>
              <div className='score'><span className='plus'></span>{element.score}<span className='minus'></span></div>
              <div className='reply'><span className='replyIcon'></span> Reply</div>
            </div>
            <div className='replies__container'>
              {element.replies.map((item, index) => (
                <div className='comment__container' key={index}>
                <div className='contentComment' >{item.content}</div>
                <div className='createdAt'>{item.createdAt}</div>
                <div className='user'>
                  <img className='userImage' src={item.user.image.webp} alt='avatar'/>
                  <div className='username'>{item.user.username}</div>
                </div>
                <div className='score'><span className='plus'></span>{item.score}<span className='minus'></span></div>
                <div className='reply'><span className='replyIcon'></span> Reply</div>
                </div>
              ))
              }
            </div>
            </>
        ))
        }
      </main>
    </div>
  );
}

export default App;
