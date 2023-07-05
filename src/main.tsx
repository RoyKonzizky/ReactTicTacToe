import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PvpMenu from './Menus/PVP/PvpMenu.tsx'
import './index.css'
import App from "./App/App.tsx";
import CpuMenu from "./Menus/CPU/CpuMenu.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/PvpMenu',
        element: <PvpMenu />,
    },
    {
        path: '/CpuMenu',
        element: <CpuMenu />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
