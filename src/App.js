import { useEffect, useState } from 'react';
import './App.css';
import jsonData from "./data/data.json";



function App() {
  const [data,setData]= useState(jsonData);
  const [addComment, setAddComment]= useState();
    console.log("data", data);

  const handleReply = ()=> {
    // setAddComment(!addComment);
  }

  const handleScore = (comment,operation) => {
    let value;
    if (operation==='plus') {
      value=+1;
    } else {
      value=-1;
    }


    const updatedData = data.comments.map((elementData) => {
      if (elementData.id===comment.id) {
        return {
          ...elementData,
          score: elementData.score + value
        };
      }
      let updateReplies= elementData.replies;
      if (elementData.replies.length > 0) {
          updateReplies = elementData.replies.map((rep) => {
          if (rep.id===comment.id) {
            return {
              ...rep,
              score: rep.score + value
            };
          }
          return rep;
          })
      }
      return {
        ...elementData,
        replies: updateReplies
      };
    });
    setData({...data,  comments:updatedData})
  }

  // const handleminus = (comment) => {
  //   const updatedData = data.comments.map((elementData) => {
  //     if (elementData.id===comment.id) {
  //       return {
  //         ...elementData,
  //         score: elementData.score - 1
  //       };
  //     }
  //     let updateReplies= elementData.replies;
  //     if (elementData.replies.length > 0) {
  //         updateReplies = elementData.replies.map((rep) => {
  //         if (rep.id===comment.id) {
  //           return {
  //             ...rep,
  //             score: rep.score -1
  //           };
  //         }
  //         return rep;
  //         })
  //     }
  //     return {...elementData,
  //       replies: updateReplies
  //     }
  //   });
  //   setData({...data,  comments:updatedData});
  // }

  return (
    <div className="App">
      <main>
        {data && data.comments && data.comments.map((commentsItem)=>(
          <div key={commentsItem.id}>
            <div className='comment__container' >
              <div className='contentComment' >{commentsItem.content}</div>
              <div className='createdAt'>{commentsItem.createdAt}</div>
              <div className='user'>
                <img className='userImage' src={commentsItem.user.image.webp} alt='avatar'/>
                <div className='username'>{commentsItem.user.username}</div>
              </div>
              <div className='score'><span className='plus' onClick={()=>handleScore(commentsItem, 'plus')}></span>{commentsItem.score}<span className='minus' onClick={()=>handleScore(commentsItem,'minus')} ></span></div>
              <div className='reply' onClick={()=>handleReply(commentsItem)}><span className='replyIcon'></span> Reply</div>
            </div>
            {addComment&& (<div>aca se agrega el comentario </div>)}
            <div className='replies__container'>
              {commentsItem.replies.map((repliesItem, index) => (
                <div className='comment__container' key={index}>
                <div className='contentComment' >{repliesItem.content}</div>
                <div className='createdAt'>{repliesItem.createdAt}</div>
                <div className='user'>
                  <img className='userImage' src={repliesItem.user.image.webp} alt='avatar'/>
                  <div className='username'>{repliesItem.user.username}</div>
                </div>
                <div className='score'><span className='plus' onClick={()=>handleScore(repliesItem, 'plus')}></span>{repliesItem.score}<span className='minus' onClick={()=>handleScore(repliesItem,'minus')}></span></div>
                <div className='reply' onClick={()=>handleReply(repliesItem)}><span className='replyIcon'></span> Reply</div>
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
