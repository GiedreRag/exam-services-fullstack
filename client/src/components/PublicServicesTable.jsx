import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function PublicServicesTable({ filterCity, filterTitle }) {
    const { services, updateServices } = useContext(GlobalContext); 

    useEffect(() => {
        fetch('http://localhost:3001/api/services/', {
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
                            .filter(service => filterCity === 'All' ? true : service.city === filterCity)
                            .filter(service => filterTitle === '' ? true : service.title.toLowerCase().includes(filterTitle))
                            .map((service, idx) => (
                                <tr key={service.title + idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img style={imageStyle} src={service.img} alt="service" />
                                    </td>
                                    <td>{service.title}</td>
                                    <td>{service.city}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary me-2" to={`/`}>Daugiau</Link>
                                        <Link className="btn btn-outline-primary me-2" to={`/`}>Susisiekti</Link>
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