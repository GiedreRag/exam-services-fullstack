import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function ServicesTable( { role }) {
    const { services, updateServices } = useContext(GlobalContext); 

    useEffect(() => {
        fetch('http://localhost:3001/api/services/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateServices(data.list);
                }
            })
            .catch(console.error);
    }, []);

    const imageStyle = {
        width: 50,
        height: 50,
        objectFit: 'container',
        objectPosition: 'center',
    }

    return (
        <div className="container" >
            <div className="table-responsive">
                <table className="table border-top mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nuotrauka</th>
                            <th scope="col">Pavadinimas</th>
                            <th scope="col">Miestas</th>
                            <th className="text-center" scope="col">Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services
                            .map((service, idx) => (
                                <tr key={service.title + idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img style={imageStyle} src={service.img} alt="service" />
                                    </td>
                                    <td>{service.title}</td>
                                    <td>{service.city}</td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            {role === 'admin' && <Link className="btn btn-outline-primary me-2">Blokuoti</Link>}
                                            {role === 'seller' && <Link className="btn btn-outline-primary me-2">Koreguoti</Link>}
                                            {role === 'seller' && <button className="btn btn-outline-danger me-2">Ištrinti</button>}
                                        </div> 
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}