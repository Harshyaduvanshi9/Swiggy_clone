
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { useState,useEffect } from 'react';
import appStore from './redux/appStore';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';


function App() {
  const [userName,setUserName]=useState("");
  
  useEffect(() => {
    const data = {
      name: "Harsh Kumar",
    };

    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="m-auto max-w-6xl">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
  
}

export default App;
