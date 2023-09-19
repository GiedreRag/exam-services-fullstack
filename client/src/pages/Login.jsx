import style from '../components/Form.module.css';
import style2 from '../components/Button.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export function Login() {
    const { updateEmail, updateFullname, updateLoginStatus, updateRole } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [formErr, setFormErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function updateEmailHandler(e) {
        setEmail(e.target.value);
    }

    function updatePasswordHandler(e) {
        setPassword(e.target.value);
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

    function submitHandler(e) {
        e.preventDefault();

        setFormErr('');

        if (email && password) {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    email, 
                    password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'err-list') {
                        for (const item of data.errors) {
                            if (item.input === 'email') {
                                setFormErr(item.msg);
                            }
                            if (item.input === 'password') {
                                setPasswordErr(item.msg);
                            }
                        }
                    }
                    if (data.status === 'ok') {
                        updateLoginStatus(true);
                        updateEmail(data.user.email);
                        updateFullname(data.user.fullname);
                        updateRole(data.user.role);
                        navigate('/paskyra');
                    }
                })
                .catch(err => console.error(err));
        } 
    }

    return (
        <>
            <div className={style.body}>
                <h1>Prašome prisijunkite!</h1>
                <form className={style.form} onSubmit={submitHandler}>
                {formErr && <div className="alert alert-danger">{formErr}</div>}
                    <div>
                        <input onChange={updateEmailHandler} onBlur={isValidEmail} autoComplete="on" value={email} id='email' type="email" required
                            className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                        <label htmlFor="email">Elektroninis paštas</label>
                        <div className="invalid-feedback">{emailErr}</div>
                    </div>
                    <div>
                        <input onChange={updatePasswordHandler} onBlur={isValidPassword} autoComplete="off" value={password} id='password' type={showPassword ? 'text' : 'password'} required
                            className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordValid ? 'is-valid' : ''}`} />
                        <label className="me-2" htmlFor="password">Slaptažodis</label>
                        <div className="invalid-feedback">{passwordErr}</div>
                        {showPassword ? (
                            <AiFillEye onClick={() => setShowPassword(false)} />
                        ) : (
                            <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    <button className={style2.button} type="submit">Prisijungti</button>
                </form>
            </div>
        </>
    );
}