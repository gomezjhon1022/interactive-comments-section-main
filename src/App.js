import { Fragment, useEffect, useState } from 'react';
import './App.css';
import jsonData from "./data/data.json";

function Comment({comment, handleReply, handleScore, handleText, saveComment, setModalIsOpen, setCommentToDelete}) {
  const [showAddComment, setShowAddComment]=useState(false);
  const [userScored, setUserScored]=useState(false);
  const [isCurrentUserComment, setIsCurrentUserComment] = useState(false);
  const currentUser = "juliusomo"
  useEffect(()=> {
    if (currentUser && comment.user.username === currentUser) {
      setIsCurrentUserComment(true);
    } else {
      setIsCurrentUserComment(false);
    }
  }, [currentUser, comment.user.username]);

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

  const handleScoreClick =(comment, operation )=> {
    if (!userScored) {
      handleScore(comment, operation);
      setUserScored(true);
    }
  }

  const handleEdit = () => {
    console.log("edit")
  }

  const handleDelete = (comment) => {
    console.log("delete")
    console.log(comment)
    setModalIsOpen(true);
    setCommentToDelete(comment);

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
          <div className='score'>
            <span className={`plus ${userScored?'invisible':''}`} onClick={()=>handleScoreClick(comment, 'plus')}></span>
              {comment.score}
            <span className={`minus ${userScored?'invisible':''}`} onClick={()=>handleScoreClick(comment,'minus')} ></span></div>
            {isCurrentUserComment?(
              <div className='edit-delete'>
                <button className='delete' onClick={()=>handleDelete(comment)}><span className='deleteIcon'></span>Delete</button>
                <button className='edit' onClick={handleEdit}><span className='editIcon'></span>Edit</button>
              </div>
            ):
            <div className='reply' onClick={handleReplyClick}>
              <span className='replyIcon'></span>
            Reply
            </div>
            }
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
            setModalIsOpen={setModalIsOpen}
            setCommentToDelete={setCommentToDelete}
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
  const [modalIsOpen, setModalIsOpen]=useState(false);
  const [commentToDelete, setCommentToDelete]=useState();

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

  const handleCancelDelete = () => {
    setModalIsOpen(false);
  }

  const handleConfirmDelete = () => {

    const recursivelyUpdateDeleteComment= (comments)=>{
      return comments.map((comment)=>{
        if (comment.id!==commentToDelete.id) {
          if (comment.replies && comment.replies.length>0) {
            return {
              ...comment,
              replies: recursivelyUpdateDeleteComment(comment.replies),
            };
          }
          return {
            ...comment,
          };
        }
      }).filter(Boolean);
    }

    const updatedData = recursivelyUpdateDeleteComment([...data.comments]);

    setData({...data, comments:updatedData});
    setModalIsOpen(false);
//________________________________________
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
            setModalIsOpen={setModalIsOpen}
            setCommentToDelete={setCommentToDelete}
          />
        ))
        }
        {modalIsOpen&&
          <div className='modal'>
            <div className='card__delete'>
              <div className='card__title'>Delete comment</div>
              <div className='card__description'> Are you sure you want to delete this comment? This will remove the comment and can't be undone.</div>
              <div className='card__buttons'>
                <button className='btn__cancel' onClick={handleCancelDelete}>NO, CANCEL</button>
                <button className='btn__delete' onClick={handleConfirmDelete}>YES, DELETE</button>
              </div>

            </div>
          </div>}
      </main>
    </div>
  );
}

export default App;
