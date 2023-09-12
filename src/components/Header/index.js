import './Header.css';

function Header (props) {
  const {
    userCurrent,
    setIsChooseUserOpen
  }=props;

  const handleChangeUser = ()=>{
    setIsChooseUserOpen(true);
  }

  return (
    <div className='header__container'>
      <div className="header">
        <button className='header__btn' onClick={handleChangeUser}>Change user</button>
        <div className='user'>
          <img className='userImage'src={userCurrent.image.png} />
          <div className='username'>{userCurrent.username}</div>
        </div>
      </div>
    </div>
  )
}

export { Header };