import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export function CitiesTable() {
    const { cities, deleteCity } = useContext(GlobalContext); 

    function deleteCityHandler(title) {
        const isConfirmed = window.confirm("Ar tikrai norite pasalinti si miesta?");
    
        if (!isConfirmed) return;

        fetch('http://localhost:3001/api/cities/' + title, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    deleteCity(title);
                }
            })
            .catch();

    }

    return (
        <div className="container" >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Miestas</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cities.map((city, idx) => (
                            <tr key={city}>
                                <td>{idx + 1}</td>
                                <td>{city}</td>
                                <td>
                                    <Link className="btn btn-primary py-2 me-2" to={`/paskyra/koreguoti-forma/miestu-sarasas/${city}/koreguoti`}>Koreguoti</Link>
                                    <button className="btn btn-danger py-2" onClick={() => deleteCityHandler(city)} type='button'>Pašalinti</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}