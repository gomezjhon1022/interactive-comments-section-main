import './App.css';
import { Comment } from './components/Comment/index';
import { useComments } from './hooks/useComments';

function App() {
  const {
  data,modalIsOpen, setModalIsOpen, setCommentToDelete,editMode, setEditMode,textUpdate, setTextUpdate, handleScore, handleText, saveComment, saveUpdateComment, handleCancelDelete, handleConfirmDelete}=useComments();

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
            setEditMode={setEditMode}
            editMode={editMode}
            textUpdate={textUpdate}
            setTextUpdate={setTextUpdate}
            saveUpdateComment={saveUpdateComment}
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



// {
//   "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
//   "createdAt": "2 days ago",
//   "id": 4,
//   "replies": [],
//   "replyingTo": "ramsesmiron",
//   "score": 2,
//   "user": {
//     "image": {
//       "png": "./images/avatars/image-juliusomo.png",
//       "webp": "./images/avatars/image-juliusomo.webp"
//     },
//     "username": "juliusomo"
//   }
// }

// {
//   "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
//   "createdAt": "1 week ago",
//   "id": 3,
//   "replies": [],
//   "replyingTo": "maxblagun",
//   "score": 4,
//   "user": {
//     "image": {
//       "png": "./images/avatars/image-ramsesmiron.png",
//       "webp": "./images/avatars/image-ramsesmiron.webp"
//     },
//     "username": "ramsesmiron"
//   }
// }