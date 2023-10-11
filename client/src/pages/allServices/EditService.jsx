import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import defaultImg from '../../assets/default-bg.png';
import { NotAllowed } from "../../components/NotAllowed";

export function EditService() {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const { role, cities } = useContext(GlobalContext);

    const [service, setService] = useState(null);
    const [img, setImg] = useState('');
    const [imgErr, setImgErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [city, setCity] = useState('');
    const [cityErr, setCityErr] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/services/' + serviceId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setService(data.service);
                    const service = data.service;
                    setImg(service.img);
                    setTitle(service.title);
                    setCity(service.city);
                }
            })
            .catch(console.error);
    }, []);

    if (role !== 'seller') {
        return <NotAllowed />;
    }

    function updateImg(e) {
        const formData = new FormData();
        formData.append('serviceImg_img', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/service', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImg(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imgValidity() {
        if (img === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function titleValidity() {
        const maxSize = 60;

        if (title === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (title.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidžiama ${maxSize} simboliai.`;
        }

        return '';
    }

    function cityValidity() {
        if (!cities.includes(city)) {
            return 'Reikia nurodyti miestą.';
        }

        return '';
    }

    function isValidForm() {
        const imgMsg = imgValidity();
        setImgErr(imgMsg);

        const titleMsg = titleValidity();
        setTitleErr(titleMsg);

        const cityMsg = cityValidity();
        setCityErr(cityMsg);

        return !imgMsg && !titleMsg && !cityMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/services/' + serviceId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                img, title, city
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/paskyra/servizai');
                }
            })
            .catch(console.error);
    }

    const defaultImgStyle = {
        height: 200,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imgStyle = {
        height: 200,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Koreguoti serviza</h3>
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={img ? img : defaultImg} alt="servizas" className="col-12 p-0 mb-3"
                            style={img ? imgStyle : defaultImgStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Nuotrauka</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImg} type="file"
                                className={`form-control ${imgErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imgErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Pavadinimas</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text"
                                className={`form-control ${titleErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{titleErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="city">Miestas</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${cityErr ? 'is-invalid' : ''}`}
                                onChange={e => setCity(e.target.value)} value={city} id="city">
                                <option value="None">- Select</option>
                                {cities.map(ct =>
                                    <option key={ct} value={ct}>{ct}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{cityErr}</div>
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary py-2 me-2" type="submit">Pakeisti</button>
                    <Link className="btn btn-danger py-2" to="/paskyra/servizai" type="submit">Atšaukti</Link>
                </form>
            </div>
        </div>
    )
}