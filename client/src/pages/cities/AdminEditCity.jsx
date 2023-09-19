import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";
import { useNavigate, useParams, Link } from "react-router-dom";

export function AdminEditCity() {
    const { city } = useParams();
    const navigate = useNavigate();
    const { role, changeCity } = useContext(GlobalContext);
    const [text, setText] = useState(city);
    const [errorMessage, setErrorMessage] = useState(null);

    if (role !== 'admin') {
        return <NotAllowed />;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!text) {
            return;
        }

        fetch('http://localhost:3001/api/cities/' + city, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newTitle: text }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    changeCity(city, text);
                    navigate('/paskyra/koreguoti-forma/miestu-sarasas');
                } else if (data.status === 'err-list') {
                    setErrorMessage(data.errors[0].msg);
                }
            })
            .catch(console.error);
    }

    return (
        <div className="container">
            <div className="row ">
                <h4 className="col-12 mb-3">
                    Koreguoti miesto pavadinimą
                </h4>
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4">

                    <div className="form-floating mb-3">
                        <input onChange={e => setText(e.target.value)} value={text} type="text" className="form-control" id="city" />
                        <label htmlFor="city">Miestas</label>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>

                    <button className="btn btn-primary py-2 me-2" type="submit">Pakeisti</button>
                    <Link className="btn btn-danger py-2" to="/paskyra/koreguoti-forma/miestu-sarasas" type="submit">Atšaukti</Link>
                </form>
            </div>
        </div>
    );
}