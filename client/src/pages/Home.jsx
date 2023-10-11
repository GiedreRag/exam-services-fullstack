import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function Home({ limit }) {
    const { services, updateServices } = useContext(GlobalContext); 

    useEffect(() => {
        fetch(`http://localhost:3001/api/services/?limit=${limit}`, {
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
        width: 100,
        height: 100,
        objectFit: 'container',
        objectPosition: 'center',
    }
    
    return (
        <div className="container px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom text-center">Paskutiniai 3 užregistruoti servizai</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            {
                services
                    .map((service, idx) => (
                        <div key={service.title + idx} className="d-flex align-items-center justify-content-center">
                            <div className="feature col">
                                <div className="feature-icon d-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
                                    <img style={imageStyle} src={service.img} alt="servizas" />
                                </div>
                                <h3 className="fs-2 text-body-emphasis text-center">{service.title}</h3>
                                <p className="text-center">{service.city}</p>
                                <Link href="/" className="icon-link d-flex justify-content-center">
                                    Daugiau
                                </Link>
                            </div>
                        </div>
                    ))
            }
            </div>
        </div>
    );
}