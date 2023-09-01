import { Fragment, useState } from 'react';
import './App.css';
import jsonData from "./data/data.json";

function Comment({comment, handleReply, handleScore, handleText, saveComment}) {
  const [showAddComment, setShowAddComment]=useState(false);

  const toggleAddComment = ()=> {
    setShowAddComment(!showAddComment);
  }
  const handleReplyClick = () => {
    toggleAddComment();
  }
  const handleSaveComment = () => {
    saveComment(comment.id);
    clearComment();
  }
  const clearComment = () => {
    setShowAddComment(false);

  }

  return (
    <Fragment key={comment.id}>
      <div className='comment__container'>
        <div className='contentComment' >{comment.content}</div>
          <div className='createdAt'>{comment.createdAt}</div>
          <div className='user'>
            <img className='userImage' src={comment.user.image.webp} alt='avatar'/>
            <div className='username'>{comment.user.username}</div>
          </div>
          <div className='score'><span className='plus' onClick={()=>handleScore(comment, 'plus')}></span>{comment.score}<span className='minus' onClick={()=>handleScore(comment,'minus')} ></span></div>
          <div className='reply' onClick={handleReplyClick}><span className='replyIcon'></span> Reply</div>
        </div>
      {showAddComment && (
        <div className='addComment__container'>
          <textarea className='addComent__text' placeholder='Add a comment...' onChange={handleText}></textarea>
          <img className='userImage' src="./images/avatars/image-juliusomo.webp"></img>
          <button className='btnSend' onClick={handleSaveComment}>SEND</button>
        </div>
      )}
      <div className='replies__container'>
        {comment.replies?.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            showAddComment={showAddComment}
            handleReply={handleReply}
            handleScore={handleScore}
            handleText={handleText}
            saveComment={saveComment}
          />
        ))}
      </div>
    </Fragment>
  )
}


function App() {
  const [data,setData]= useState(jsonData);
  const [text, setText]=useState();
  const [id, setId] =useState(10);

  const handleScore = (comment,operation) => {
  const value = operation === 'plus'? 1 : -1;

  const updatedData = recursivelyUpdateScore([...data.comments], comment.id, value);
    setData({...data, comments: updatedData});
  }

  const recursivelyUpdateScore = (comments, commentId, value) => {
    return comments.map((comment) => {
      if (comment.id ===commentId) {
        return {
          ...comment,
          score: comment.score + value,
        };
      } else if (comment.replies && comment.replies.length>0) {
        return {
          ...comment,
          replies: recursivelyUpdateScore(comment.replies, commentId, value),
        };
      }
      return comment;
    })
  }


  const handleText = (e) => {
    setText(e.target.value);
  }

  const saveComment = (commentId) => {
    const updatedData = recursivelyUpdateComment(data.comments, commentId);
    setData({...data, comments:updatedData});
  }

  const recursivelyUpdateComment = (comments, commentId) => {
      return comments.map((comment)=>{
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies] : [],
            replies: [
              ...comment.replies,
              {
                id: getId(),
                content: text,
                createdAt: "just now",
                score: 0,
                user: {
                  "image": {
                    "png": "./images/avatars/image-juliusomo.png",
                    "webp": "./images/avatars/image-juliusomo.webp"
                  },
                  username: "juliusomo"
                },
                replies: []
              }
            ]
          }
        } else if (comment.replies && comment.replies.length>0) {
          return {
            ...comment,
            replies: recursivelyUpdateComment(comment.replies, commentId)
          };
        }
        return comment;
      });
  }

  const getId = () => {
    const newId = id+1;
    setId(newId);
    return newId;
  }

  return (
    <div className="App">
      <main>
        {data && data.comments && data.comments.map((comment)=>(
          <Comment
            key={comment.id}
            comment={comment}
            handleScore={handleScore}
            handleText={handleText}
            saveComment={saveComment}
          />
        ))
        }
      </main>
    </div>
  );
}

export default App;
