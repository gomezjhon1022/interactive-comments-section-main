import { useState, useEffect, Fragment } from "react";


function Comment(props) {
  const {
    comment, handleReply, handleScore, handleText, saveComment, setModalIsOpen, setCommentToDelete, editMode, setEditMode, textUpdate, setTextUpdate, saveUpdateComment
  }=props;



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

  const handleEdit = (comment) => {
    setTextUpdate(comment.content);
    setEditMode(comment.id);
  }

  const handleDelete = (comment) => {
    setModalIsOpen(true);
    setCommentToDelete(comment);
  }

  const handleUpdateComment = () => {
    saveUpdateComment();
    clearUpdateComment();
  }

  const clearUpdateComment=()=>{
    setEditMode("");
    setTextUpdate("");
  }
  return (
    <Fragment key={comment.id}>
      <div className='comment__container'>
          {
            editMode===comment.id?
            <div className='text__edit__container'>
              <textarea
                className='text__edit'
                value={textUpdate}
                onChange={(e) => {
                  setTextUpdate(e.target.value);
                  }
                }
              ></textarea>
              <button className='btn__update' onClick={handleUpdateComment}>UPDATE</button>
            </div>
            :<div className='contentComment' >{comment.content}</div>
          }
          <div className='createdAt'>{comment.createdAt}</div>
          <div className='user'>
            <img className='userImage' src={comment.user.image.webp} alt='avatar'/>
            <div className='username'>{comment.user.username}</div>
          </div>
          <div className='score'>
            <span className={`plus ${userScored?'invisible':''}`} onClick={()=>handleScoreClick(comment, 'plus')}></span>
              {comment.score}
            <span className={`minus ${userScored || comment.score===0?'invisible':''}`} onClick={()=>handleScoreClick(comment,'minus')} ></span></div>
            {isCurrentUserComment?(
              <div className='edit-delete'>
                <button className='delete' onClick={()=>handleDelete(comment)}><span className='deleteIcon'></span>Delete</button>
                <button className='edit' onClick={()=>handleEdit(comment)}><span className='editIcon'></span>Edit</button>
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
            editMode={editMode}
            setEditMode={setEditMode}
            textUpdate={textUpdate}
            setTextUpdate={setTextUpdate}
            saveUpdateComment={saveUpdateComment}
          />
        ))}
      </div>
    </Fragment>
  )
}

export { Comment };