import { useState } from "react";
import FlashcardsApp from "./components/FlashcardsApp";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [userEmail, setUserEmail] = useState<string>("test@example.com");
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const handleLogout = () => {
    console.log("Logging out...");
    setUserEmail("");          // Log out
    setShowRegister(true);     // Show Register page
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);       // Log in

  };

  return (
    <>
      {!userEmail ? (
        showRegister ? (
          <Register onSwitch={() => setShowRegister(false)} />
        ) : (
          <Login 
            onSwitch={() => setShowRegister(true)} 
            onLogin={handleLogin}
          />
        )
      ) : (
        <FlashcardsApp userEmail={userEmail} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
