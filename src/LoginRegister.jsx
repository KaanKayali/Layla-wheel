import './styles.css';
import {setLanguageAccount,handleSubmitRegister,handleSubmitLogin} from "./accountFunctions.js"

export default function Account({onClose}) {
  return (
    <>
      <div className="Accountpopup" onLoad={setLanguageAccount} >
        <header>
          <img src="src/Images/laylalogo.png" alt="Logo" id="popUpLogo" />
          <button id="closePopUpBtn" onClick={onClose}>X</button>
        </header>
          <div class="AccountForm" >
            <h2 id='headText'>Login or Register</h2>
            <h3 id='advertiseText'>Login or create an account now to save your entire History!</h3>
                <form action="" onSubmit={handleSubmitLogin} id='formLogin'>
                  <label htmlFor="mailInput" className='AccLabel' id='mailLabel'>E-Mail</label> <br/>
                  <input type="text" placeholder='guido.zurbrug@gmail.com' id="mailInputLogin" className='AccInput' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required /> <br/>
                  <label htmlFor="passwordInput" className='AccLabel' id='passwordLabel'>Password</label> <br/>
                  <input type="password" id='passwordInputLogin' className='AccInput' minLength={6} required/> <br/>
                  <input type="submit" id="submitBtnLogin" className='submitBtn' value={"Login"}/>
                </form>
                <form action="" onSubmit={handleSubmitRegister} id='formRegister'>
                  <label htmlFor="mailInput" className='AccLabel' id='mailLabel'>E-Mail</label> <br/>
                  <input type="text" placeholder='guido.zurbrug@gmail.com' id="mailInput" className='AccInput' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required /> <br/>
                  <label htmlFor="passwordInput" className='AccLabel' id='passwordLabel'>Password</label> <br/>
                  <input type="password" id='passwordInput' className='AccInput' minLength={6} required/> <br/>
                  
                  <input type="submit" id="submitBtnRegister" className='submitBtn' value={"Register"}/>
                </form>
          </div>
      </div>
    </>
  );
}