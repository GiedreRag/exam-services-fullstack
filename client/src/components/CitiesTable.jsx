import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export function CitiesTable() {
    const { cities } = useContext(GlobalContext); 

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
                                    <Link className="btn btn-primary py-2 me-2" >Koreguoti</Link>
                                    <button className="btn btn-danger py-2" type='button'>Pašalinti</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}