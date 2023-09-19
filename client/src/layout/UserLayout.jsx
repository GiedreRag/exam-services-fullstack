import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Login } from "../pages/Login";

export function UserLayout() {
    const { role } = useContext(GlobalContext);
    const content = ['admin', 'seller'].includes(role) ? <Outlet /> : <Login />;

    return (
        <>
            <Header />
            <main>{content}</main>
            <Footer />
        </>
    );
}