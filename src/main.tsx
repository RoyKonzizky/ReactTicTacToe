import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Game from "./Game.tsx";
import GameMode from "./GameMode.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GameMode />,
    },
    {
        path: '/App',
        element: <App />,
    },
    {
        path: '/Game',
        element: <Game />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
