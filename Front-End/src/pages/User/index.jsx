import { NavLink, useNavigate } from "react-router-dom";
import "../../../sass/style.scss";
import { useEffect, useState } from "react";
import { logOutUser } from "../../Store/userlogin";
import { useDispatch } from "react-redux";
import { getUserAccount } from "../../Store/useraccount";
import { profilupdate } from "../../Store/profilupdate";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [editingFirstName, setEditingFirstName] = useState("");
  const [editingLastName, setEditingLastName] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      console.log("redirect to login");
      navigate("/login");
    } else {
      dispatch(getUserAccount()).then((userData) => {
        if (userData) {
          console.log(userData);
          setfirstname(userData.payload.body.firstName);
          setlastname(userData.payload.body.lastName);
        }
      });
    }
  }, [navigate, dispatch]);

  const handleDisconnect = () => {
    // Appelez logOutUser à l'aide de dispatch
    dispatch(logOutUser());

    // Réinitialisez l'élément "user" du localStorage et isAuthenticated
    localStorage.removeItem("user");

    // Redirigez l'utilisateur vers la page de connexion
    navigate("/login");
  };

  const handleNewName = () => {
    // Créez un objet avec les nouvelles valeurs du prénom et du nom
    const updatedUser = {
      firstName: editingFirstName, // Utilisez la variable d'état editingFirstName
      lastName: editingLastName,   // Utilisez la variable d'état editingLastName
    };
  
    // Appelez l'action asynchrone profilupdate avec les nouvelles données utilisateur
    dispatch(profilupdate(updatedUser))
      .then(() => {
        // La mise à jour a réussi, mettez à jour la variable d'état firstname
        setfirstname(editingFirstName);
        console.log("Mise à jour réussie !");
      })
      .catch((error) => {
        // La mise à jour a échoué, vous pouvez gérer les erreurs ici
        console.error("Erreur lors de la mise à jour :", error);
      });
  };

  const handleCancel = () => {
    // Réinitialisez les variables d'état d'édition aux valeurs actuelles du prénom et du nom
    setEditingFirstName(firstname);
    setEditingLastName(lastname);
  }
  
  return (
    <div className="contain_user">
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
          <a className="main-nav-item" href="">
            <i className="fa fa-user-circle"></i>
            {firstname}
          </a>
          <NavLink
            className="main-nav-item"
            onClick={handleDisconnect}
            to="/login"
          >
            <i className="fa fa-sign-out"></i>
            Disconnect
          </NavLink>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <div className="info_prof">
            <div className="info_welcome">Welcome back</div>
            <div className="info_input_box">
              <div className="info_box_left">
                <input
                  className="info_input"
                  type="text"
                  name=""
                  id=""
                  placeholder={firstname}
                  value={editingFirstName}
                  onChange={(e) => setEditingFirstName(e.target.value)}
                />
                <button className="info_button button_left" onClick={handleNewName}>SAVE</button>
              </div>
              <div className="info_box_right ">
                <input
                  className="info_input"
                  type="text"
                  name=""
                  id=""
                  placeholder={lastname}
                  value={editingLastName}
                  onChange={(e) => setEditingLastName(e.target.value)}
                />
                <button className="info_button button_right" onClick={handleCancel}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default User;
