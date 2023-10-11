import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function Header() {
    const { role, updateFullname, updateEmail, updateLoginStatus, updateRole} = useContext(GlobalContext);
    const navigate = useNavigate();

    function logOut () {
        fetch('http://localhost:3001/api/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(() => {
                updateLoginStatus(false);
                updateEmail('');
                updateFullname('');
                updateRole('public');
                navigate('/prisijungimas');
            })
            .catch(console.error);
    }

    const publicLinks = <>
            <Link to="/prisijungimas" className="btn btn-outline-dark me-2">Prisijungti</Link>
            <Link to="/registracija" className="btn btn-outline-dark ">Registruotis</Link>
    </>; 

    const adminLinks = <>
            <Link to="/paskyra" className="btn btn-outline-dark me-2">Paskyra</Link>
            <Link onClick={logOut} className="btn btn-outline-dark">Atsijungti</Link>
    </>;

    const sellerLinks = <>
            <Link to="/paskyra" className="btn btn-outline-dark me-2">Paskyra</Link>
            <Link onClick={logOut} className="btn btn-outline-dark ">Atsijungti</Link>
    </>;

    let extralinks = <></>;
    if (role === 'admin') {
    extralinks = adminLinks;
    } else if (role === 'seller') {
    extralinks = sellerLinks;
    } else {
    extralinks = publicLinks;
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <p>LOGO</p>
                    </Link>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Pagrindinis</Link></li>
                    <li><Link to="/visi-servizai" className="nav-link px-2 link-secondary">Visi servizai</Link></li>
                </ul>

                <div className="col-md-4 text-end">
                    {extralinks}
                </div>
            </header>
        </div>
    );
}