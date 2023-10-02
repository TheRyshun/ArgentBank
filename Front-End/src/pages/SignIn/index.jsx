import { NavLink } from "react-router-dom";
import "../../../sass/style.scss";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from "../../Store/userlogin";

const SignIN = () => {
  const [email, setEmail] = useState('tony@stark.com');
  const [password, setPassword] = useState('password123');


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    e.preventDefault();
    let userInfo = {
      email: email,
      password: password
    }
    dispatch(loginUser(userInfo)).then((result) => {
      if (result.payload) { // Vérifie le statut de la réponse
        console.log("Connexion completed");
        navigate('/profile');
      }
      else {
        console.log("Connexion échouée");
      }
    })
  }
  
  return (
    <>
    
      <div className="contain">
        <nav className="main-nav">
          <NavLink className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src="./src/assets/img/argentBankLogo.png"
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <div>
          </div>
        </nav>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button className="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
        <footer className="footer">
          <p className="footer-text">Copyright 2020 Argent Bank</p>
        </footer>
      </div>
    </>
  );
};

export default SignIN;
