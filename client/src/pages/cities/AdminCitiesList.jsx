import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";
import { Link } from "react-router-dom";

export function AdminCitiesList() {
    const { role } = useContext(GlobalContext);

    if (role !== 'admin') {
        return <NotAllowed />;
    }

    return (
        <div className="container">
            <div className="row ">
                <h4 className="col-12 mb-3">
                    Miestai
                </h4>
                <div>
                    <Link to='/paskyra/koreguoti-forma/miestu-sarasas/naujas'>Prideti nauja</Link>
                </div>
                <div className="col-12">
                    Miestu lentele
                </div>
            </div>
        </div>
    );
}