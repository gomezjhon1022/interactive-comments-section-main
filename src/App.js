import { useEffect, useState } from 'react';
import './App.css';
import jsonData from "./data/data.json";



function App() {
  const [data,setData]= useState(jsonData);
  const [addComment, setAddComment]= useState(false);
    console.log("data", data);

  const handleReply = ()=> {
    setAddComment(!addComment);
  }

  const handleplus = (comment) => {
    const updatedData = data.comments.map((element) => {
      if (element.id===comment.id) {
        return {
          ...element,
          score: element.score + 1
        };
      }
      let updateReplies= element.replies;
      if (element.replies.length > 0) {
          updateReplies = element.replies.map((rep) => {
          if (rep.id===comment.id) {
            return {
              ...rep,
              score: rep.score +1
            };
          }
          return rep;
          })
      }
      return {
        ...element,
        replies: updateReplies
      };
    });
    setData({...data,  comments:updatedData})
  }

  const handleminus = (comment) => {
    const updatedData = data.comments.map((element) => {
      if (element.id===comment.id) {
        return {
          ...element,
          score: element.score - 1
        };
      }
      let updateReplies= element.replies;
      if (element.replies.length > 0) {
          updateReplies = element.replies.map((rep) => {
          if (rep.id===comment.id) {
            return {
              ...rep,
              score: rep.score -1
            };
          }
          return rep;
          })
      }
      return {...element,
        replies: updateReplies
      }
    });
    setData({...data,  comments:updatedData});
  }

  return (
    <div className="App">
      <main>
        {data && data.comments && data.comments.map((element)=>(
          <div key={element.id}>
            <div className='comment__container' >
              <div className='contentComment' >{element.content}</div>
              <div className='createdAt'>{element.createdAt}</div>
              <div className='user'>
                <img className='userImage' src={element.user.image.webp} alt='avatar'/>
                <div className='username'>{element.user.username}</div>
              </div>
              <div className='score'><span className='plus' onClick={()=>handleplus(element)}></span>{element.score}<span className='minus' onClick={()=>handleminus(element)} ></span></div>
              <div className='reply' onClick={()=>handleReply(element)}><span className='replyIcon'></span> Reply</div>
            </div>
            {addComment&& (<div>aca se agrega el comentario </div>)}
            <div className='replies__container'>
              {element.replies.map((item, index) => (
                <div className='comment__container' key={index}>
                <div className='contentComment' >{item.content}</div>
                <div className='createdAt'>{item.createdAt}</div>
                <div className='user'>
                  <img className='userImage' src={item.user.image.webp} alt='avatar'/>
                  <div className='username'>{item.user.username}</div>
                </div>
                <div className='score'><span className='plus' onClick={()=>handleplus(item)}></span>{item.score}<span className='minus' onClick={()=>handleminus(item)}></span></div>
                <div className='reply' onClick={()=>handleReply(item)}><span className='replyIcon'></span> Reply</div>
                </div>
              ))
              }
            </div>
          </div>
        ))
        }
      </main>
    </div>
  );
}

export default App;
