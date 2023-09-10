import './SignIn.css'

function SignIn () {
  return (
  <div className="signin__container">
    <div className="signin">
      <div className='signin__title'>Choose an account</div>
      <div className='signin__user'>
        <img className='signin__img' src='./images/avatars/image-juliusomo.png'/>
        <div className='signin__username'>user 1</div>
      </div>
      <div className='signin__user'>
        <img className='signin__img' src='./images/avatars/image-juliusomo.png'/>
        <div className='signin__username'>user 1</div>
      </div>
      <div className='signin__user'>
        <img className='signin__img' src='./images/avatars/image-juliusomo.png'/>
        <div className='signin__username'>user 1</div>
      </div>
      <div className='signin__user'>
        <img className='signin__img' src='./images/avatars/image-juliusomo.png'/>
        <div className='signin__username'>juliusomo</div>
      </div>
    </div>
  </div>
  )
}

export { SignIn};

