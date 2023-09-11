import './Header.css';

function Header (props) {
  const {
    setIsChooseUserOpen,
    userCurrent,
    dataUsers
  }=props;

  let name;
  let photo;

  const handleChangeUser = ()=>{
    setIsChooseUserOpen(true);
  }

  const user=()=>{
    dataUsers.users.forEach(element => {
      if (element.username===userCurrent) {
        name=element.username;
        photo=element.image.png
      }
    });
  }
  user();
  return (
    <div className='header__container'>
      <div className="header">
        <button className='header__btn' onClick={handleChangeUser}>Change user</button>
        <div className='user'>
          <img className='userImage'src={photo} />
          <div className='username'>{name}</div>
        </div>
      </div>
    </div>
  )
}

export { Header };