import { useContext } from "react";
import { AdminAccount } from "./admin/AdminAccount";
import { GlobalContext } from "../../context/GlobalContext";
import { SellerAccount } from "./seller/SellerAccount";
import { Login } from "../Login";

export function Account() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminAccount />;
    }

    if (role === 'seller') {
        return <SellerAccount />;
    }

    return <Login />;
}