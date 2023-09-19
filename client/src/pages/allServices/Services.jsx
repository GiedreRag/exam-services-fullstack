import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";
import { AdminServices } from "./AdminServices";
import { SellerServices } from "./SellerServices";

export function Services() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminServices />;
    }

    if (role === 'seller') {
        return <SellerServices />;
    }

    return <NotAllowed />;

}