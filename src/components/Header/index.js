import './Header.css';

function Header (props) {
  const {
    setIsChooseUserOpen,
    user
  }=props;

  const handleChangeUser = ()=>{
    setIsChooseUserOpen(true);
  }
  return (
    <div className='header__container'>
      <div className="header">
        <button className='header__btn' onClick={handleChangeUser}>Change user</button>
        <div className='user'>
          <img className='userImage'src={user.photo} />
          <div className='username'>{user.name}</div>
        </div>
      </div>
    </div>
  )
}

export { Header };