import './Header.css';

function Header () {
  return (
    <div className='header__container'>
      <div className="header">
        <button className='header__btn'>Change user</button>
        <div className='user'>
          <img className='userImage'src='./images/avatars/image-ramsesmiron.png' />
          <div className='username'>ramsesmiron</div>
        </div>
      </div>
    </div>
  )
}

export { Header };