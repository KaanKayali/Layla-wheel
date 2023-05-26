import './styles.css';

export default function ShowWinner({ winner, onClose  }) {
  return (
    <>
      <div className="popup">
        <header>
          <img src="src/Images/laylalogo.png" alt="Logo" id="popUpLogo" />
          <button id="closePopUpBtn" onClick={onClose}>X</button>
        </header>
        <br />
        <h1 id="winnerEntry">{winner}</h1>
      </div>
    </>
  );
}