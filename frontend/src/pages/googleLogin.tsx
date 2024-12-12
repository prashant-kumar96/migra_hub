import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

const App = () => {
  const [user, setUser] = useState(null);

  const onSuccess = async (response) => {
    const res = await fetch("http://localhost:5000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.tokenId }),
    });
    const userData = await res.json();
    setUser(userData);
  };

  const onFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default App;
