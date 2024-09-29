import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './Components/About';
import Error from './Components/Error';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Contact from './Components/Contact';
import Body from './Components/Body'
import RestaurantMenu from './Components/RestaurantMenu';


const Routes=()=>{
  return (

    <div className="routes">  
        <App />   
        <Outlet />    
    </div>

  )
}

const appR = createBrowserRouter(
  [
    {
      path: '/',
      element: <Routes/>,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/restaurants/:resId',
          element: <RestaurantMenu />
        }
      ],
      errorElement: <Error />
    }

  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appR} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
