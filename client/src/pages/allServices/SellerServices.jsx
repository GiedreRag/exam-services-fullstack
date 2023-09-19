import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { ServicesTable } from "../../components/ServicesTable";

export function SellerServices() {
    const { role } = useContext(GlobalContext);

    return (
        <div className="container" >
            <h3>Mano servizai</h3>
            <div className="mb-3">
                <Link to='/paskyra/servizai/naujas'>Pridėti naują</Link>
            </div>
            <div className="col-12">
                <ServicesTable role={role}/>
            </div>
        </div>
    );
}