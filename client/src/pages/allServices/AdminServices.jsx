import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { ServicesTable } from "../../components/ServicesTable";

export function AdminServices() {
    const { role } = useContext(GlobalContext);

    return (
        <div className="container" >
            <h3>Visi servizai</h3>
            <div className="col-12">
                <ServicesTable role={role}/>
            </div>
        </div>
    );
}