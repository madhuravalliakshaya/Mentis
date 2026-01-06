import { useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Search from "./Firstpage.jsx"; 
import Login from "./login.jsx";
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Login />;
  }

  return (
    <>
    <h1>Welcome to Mentis</h1>
    </>
  )
  
}
