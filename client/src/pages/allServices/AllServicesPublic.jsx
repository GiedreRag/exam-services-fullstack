import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { PublicServicesTable } from "../../components/PublicServicesTable";

export function AllServicesPublic() {
    const { cities } = useContext(GlobalContext);
    const [selectedCity, setSelectedCity] = useState('All');
    const [title, setTitle] = useState('');

    return (
        <div className="container" >
            <h3 className="pb-3">Visi servizai</h3>
            <div className="col-12">
                <div className="row">
                    <div className="col-6 col-sm-4 col-md-3">
                        <p>Ieškoti pagal miestus</p>
                        <select className="form-select" 
                            onChange={e => setSelectedCity(e.target.value)}>
                            <option value="All">Visi</option>
                            {cities.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <p>Ieškoti pagal pavadinimą</p>
                        <input type="text" className="form-control" value={title} 
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <PublicServicesTable filterCity={selectedCity} filterTitle={title.toLowerCase()} limit={1000}/>
            </div>
        </div>
    );
}
