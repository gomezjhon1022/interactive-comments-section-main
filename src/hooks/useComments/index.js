import jsonData from "../../data/data.json";
import jsonDataUsers from "../../data/users.json";
import { useState } from "react";

function useComments() {
  const [data,setData]= useState(jsonData);
  const [text, setText]=useState();
  const [id, setId] =useState(10);
  const [modalIsOpen, setModalIsOpen]=useState(false);
  const [commentToDelete, setCommentToDelete]=useState();
  const [editMode, setEditMode]=useState();
  const [textUpdate, setTextUpdate]=useState();
  const [isChooseUserOpen, setIsChooseUserOpen]=useState(true);
  const [dataUsers, setDataUsers]=useState(jsonDataUsers)
  const [userCurrent, setUserCurrent]=useState();

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
        } else {
          return {
            ...comment,
            replies: []
          };
        }
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
  }

  const saveUpdateComment = () => {
    const recursivelyUpdateComment=(comments)=>{
      return comments.map((comment)=>{
        if (comment.id!==editMode) {
          if (comment.replies && comment.replies.length>0) {
            return {
              ...comment,
              replies: recursivelyUpdateComment(comment.replies)
            }
          }
          return {
            ...comment,
          }
        } else {
          return {
            ...comment,
            content: textUpdate
          }
        }
      })
    }
    const updateData = recursivelyUpdateComment([...data.comments]);
    setData({...data, comments:updateData});
  }
  return {
    data,
    setData,
    text,
    setText,
    id,
    setId,
    modalIsOpen,
    setModalIsOpen,
    commentToDelete,
    setCommentToDelete,
    editMode,
    setEditMode,
    textUpdate,
    setTextUpdate,
    handleScore,
    saveComment,
    handleText,
    saveUpdateComment,
    handleCancelDelete,
    handleConfirmDelete,
    isChooseUserOpen,
    setIsChooseUserOpen,
    dataUsers,
    userCurrent,
    setUserCurrent
  };
}

export {useComments};