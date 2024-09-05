import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
//React.StrictMode is a development-only feature in React that helps identify potential problems in your application.
//One of its behaviors is to intentionally double-invoke certain lifecycle methods, including the render method, for components inside it.
//This double rendering helps detect side effects that shouldn't be in the render phase and makes them more noticeable.
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <>
  <RouterProvider router={router}/> 
   {/* <App/> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
