import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Body from "./Components/Body";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import Contact from "./Components/Contact";
import React,{ lazy } from "react";
import Cart from "./Components/Cart";

const About = lazy(() => import("./Components/About"));


 export const appR = createBrowserRouter(
    [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            path: "/",
            element: <Body />,
          },
          {
            path: '/about',
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <About />
              </React.Suspense>
            ),
          },
          {
            path: '/contact',
            element: <Contact />
          },
          {
            path: '/restaurants/:resId',
            element: <RestaurantMenu />
          },
          {
            path:'/cart',
            element:<Cart/>
          }
        ],
        errorElement: <Error />
      }
  
    ]
  );
  
 

 
