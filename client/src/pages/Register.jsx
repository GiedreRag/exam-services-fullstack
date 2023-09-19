import style from '../components/Form.module.css';
import style2 from '../components/Button.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export function Register() {
    const navigate = useNavigate();
    const [formErr, setFormErr] = useState('');
    const [fullname, setFullname] = useState('');
    const [fullnameErr, setFullnameErr] = useState('');
    const [fullnameValid, setFullnameValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [repassword, setRepassword] = useState('');
    const [repasswordErr, setRepasswordErr] = useState('');
    const [repasswordValid, setRepasswordValid] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);


    function updateFullname(e) {
        setFullname(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function updateRepassword(e) {
        setRepassword(e.target.value);
    }

    function isValidFullnameFormat(name) {
        const nameWords = name.split(' ');
        if (nameWords.length < 2 || nameWords.length > 3) {
            return false;
        } 

        for (const word of nameWords) {
            if (word[0] !== word[0].toUpperCase()) {
                return false;
            }
        }

        return true;
    }

    function isValidFullname() {
        const minFullnameSize = 5;
        const maxFullnameSize = 60;

        if (!isValidFullnameFormat(fullname)) {
        setFullnameErr(`Pilnas vardas turi susideti is dvieju ar triju zodziu, kuriu kiekvienas prasideda didziaja raide. Galima naudoti tik raides.`);
        setFullnameValid(false);
        } else if (fullname.length < minFullnameSize) {
            setFullnameErr(`Privaloma maziausiai ${minFullnameSize} simboliai.`);
            setFullnameValid(false);
        } else if (fullname.length > maxFullnameSize) {
            setFullnameErr(`Leidziama daugiausiai ${maxFullnameSize} simboliu.`);
            setFullnameValid(false);
        } else {
            setFullnameErr(false);
            setFullnameValid(true);
        }
    }

    function isValidEmail() {
        const minEmailSize = 6;
        const maxEmailSize = 60;
        const atSymbol = email.indexOf('@');
        const dotSymbol = email.lastIndexOf('.');
        const atSymbolCount = email.split('@').length - 1;
        const topLevelDomain = email.slice(dotSymbol + 1);

        if (email.length < minEmailSize) {
            setEmailErr(`Privaloma maziausiai ${minEmailSize} simboliai.`);
            setEmailValid(false);
        } else if (email.length > maxEmailSize) {
            setEmailErr(`Leidziama daugiausiai ${maxEmailSize} simboliu.`);
            setEmailValid(false);
        } else if (!email.includes('@')) {
            setEmailErr(`Truksta "@" simbolio.`);
            setEmailValid(false);
        } else if (atSymbolCount > 1) {
            setEmailErr(`Leidziamas tik 1 "@" simbolis.`);
            setEmailValid(false);
        } else if (atSymbol > dotSymbol - 3 || dotSymbol === -1) {
            setEmailErr(`Netinkamas email formatas, pavyzdys: example@example.com`);
            setEmailValid(false);
        } else if (topLevelDomain.length < 2 || topLevelDomain.length > 4) {
            setEmailErr(`Netinkamas top-level domain.`);
            setEmailValid(false);
        } else {
            setEmailErr(false);
            setEmailValid(true);
        }
    }

    function isValidPassword() {
        const minPasswordSize = 6;
        const maxPasswordSize = 60;

        if (password.length < minPasswordSize) {
            setPasswordErr(`Privaloma maziausiai ${minPasswordSize} simboliai.`);
            setPasswordValid(false);
        } else if (password.length > maxPasswordSize) {
            setPasswordErr(`Leidziama daugiausiai ${maxPasswordSize} simboliu.`);
            setPasswordValid(false);
        } else {
            setPasswordErr(false);
            setPasswordValid(true);
        }
    }

    function isValidRepassword() {
        if (password !== repassword) {
            setRepasswordErr('Slaptazodziai nesutampa.');
            setRepasswordValid(false);
        } else {
            setRepasswordErr(false);
            setRepasswordValid(true);
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        if (fullname && email && password && repassword && termsAccepted) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ 
                    fullname, 
                    email, 
                    password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'err-list') {
                        for (const item of data.errors) {
                            if (item.input === 'fullname') {
                                setFullnameErr(item.msg);
                            }
                            if (item.input === 'email') {
                                setFormErr(item.msg);
                            }
                            if (item.input === 'password') {
                                setPasswordErr(item.msg);
                            }
                        }
                    }
                    if (data.status === 'ok') {
                        return navigate('/prisijungimas');
                    }
                })
                .catch(err => console.error(err));
        } 
    }

    return (
        <>
            <div className={style.body}>
                <h1>Užsiregistruokite!</h1>
                <form className={style.form} onSubmit={submitHandler}>
                {formErr && <div className="alert alert-danger">{formErr}</div>}
                    <div>
                        <input onChange={updateFullname} onBlur={isValidFullname} autoComplete="on" value={fullname} id='fullname' type="text" required
                            className={`form-control ${fullnameErr ? 'is-invalid' : ''} ${fullnameValid ? 'is-valid' : ''}`} />
                        <label htmlFor="fullname">Pilnas vardas</label>
                        <div className="invalid-feedback">{fullnameErr}</div>
                    </div>
                    <div>
                        <input onChange={updateEmail} onBlur={isValidEmail} autoComplete="on" value={email} id='email' type="email" required
                            className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                        <label htmlFor="email">Elektroninis paštas</label>
                        <div className="invalid-feedback">{emailErr}</div>
                    </div>
                    <div>
                        <input onChange={updatePassword} onBlur={isValidPassword} autoComplete="off" value={password} id='password' type={showPassword ? 'text' : 'password'} required
                            className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordValid ? 'is-valid' : ''}`} />
                        <label className="me-2" htmlFor="password">Slaptažodis</label>
                        <div className="invalid-feedback">{passwordErr}</div>
                        {showPassword ? (
                            <AiFillEye onClick={() => setShowPassword(false)} />
                        ) : (
                            <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    <div>
                        <input onChange={updateRepassword} onBlur={isValidRepassword} autoComplete="off" value={repassword} id='repassword' type={showRepassword ? 'text' : 'password'} required
                            className={`form-control ${repasswordErr ? 'is-invalid' : ''} ${repasswordValid ? 'is-valid' : ''}`} />
                        <label className="me-2" htmlFor="repeatpasword">Pakartoti slaptažodį</label>
                        <div className="invalid-feedback">{repasswordErr}</div>
                        {showRepassword ? (
                            <AiFillEye onClick={() => setShowRepassword(false)} />
                        ) : (
                            <AiFillEyeInvisible onClick={() => setShowRepassword(true)} />
                        )}
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                            <Link className={style.termsText} to='/taisykles'>Susipažinau ir sutinku su naudojimosi taisyklėmis ir privatumo politika.</Link>
                        </label>
                    </div>
                    <button className={style2.button} type="submit" disabled={!termsAccepted}>Registruotis</button>
                </form>
            </div>
        </>
    );
}