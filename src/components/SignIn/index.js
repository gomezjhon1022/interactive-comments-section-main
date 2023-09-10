import './SignIn.css'

function SignIn (props) {
  const {
    dataUsers,
    setUserCurrent,
    setIsChooseUserOpen
  }=props;

  const handleCurrentUser = (user) => {
    setUserCurrent(user);
    setIsChooseUserOpen(false);

  }
  return (
  <div className="signin__container">
    <div className="signin">
      <div className='signin__title'>Choose an account</div>
      {dataUsers.users.map((user)=> {
        return (
          <div className='signin__user' key={user.username} onClick={()=> handleCurrentUser(user.username)}>
            <img className='signin__img' src={user.image.png}/>
            <div className='signin__username'>{user.username}</div>
          </div>
          )
      })}
    </div>
  </div>
  )
}

export { SignIn};

