import { Fragment } from 'react';
import './App.css';
import { Comment } from './components/Comment/index';
import { Header } from './components/Header';
import { SignIn } from './components/SignIn';
import { useComments } from './hooks/useComments';

function App() {
  const {
    data,
    modalIsOpen,
    setModalIsOpen,
    setCommentToDelete,
    editMode,
    setEditMode,
    textUpdate,
    setTextUpdate,
    handleScore,
    handleText,
    saveComment,
    saveUpdateComment,
    handleCancelDelete,
    handleConfirmDelete,
    isChooseUserOpen,
    setIsChooseUserOpen,
    dataUsers,
    userCurrent,
    setUserCurrent,
  }=useComments();
  return (
    <div className="App">
      {isChooseUserOpen
        ?<SignIn
          dataUsers={dataUsers}
          setUserCurrent={setUserCurrent}
          setIsChooseUserOpen={setIsChooseUserOpen}
        />
        :<Fragment>
          <Header
            setIsChooseUserOpen={setIsChooseUserOpen}
            userCurrent={userCurrent}
          />
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
                userCurrent={userCurrent}
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
              </div>
            }
          </main>
        </Fragment>
      }
    </div>
  );
}

export default App;

