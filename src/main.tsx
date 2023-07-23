import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PvpMenu from './Menus/PVP/PvpMenu.tsx'
import './index.css'
import App from "./App/App.tsx";
import CpuMenu from "./Menus/CPU/CpuMenu.tsx";
import GamePvp from "./GameModes/PVP/GamePvp.tsx";
import GameCPU from "./GameModes/CPU/GameCPU.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/PvpMenu',
        element: <PvpMenu/>,
    },
    {
        path: '/CpuMenu',
        element: <CpuMenu/>,
    },
    {
        path: '/GamePvp',
        element: <GamePvp/>,
    },
    {
        path: '/GameCPU',
        element: <GameCPU/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
