import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Home from "./components/Home";
import News from "./components/News";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news/:id",
    element: <News />,
  },
]);

function App() {
  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
