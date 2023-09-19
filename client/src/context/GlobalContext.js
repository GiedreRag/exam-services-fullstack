import { createContext, useState, useEffect } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    fullname: '',
    updateFulname: () => { },
    email: '',
    updateEmail: () => { },
    cities: [],
    addCity: () => { },
    updateCity: () => { },
    updateCities: () => { },
    changeCity: () => { },
    deleteCity: () => { },
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [fullname, setFullname] = useState(initialContext.fullname);
    const [email, setEmail] = useState(initialContext.email);
    const [cities, setCities] = useState(initialContext.cities);

    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setFullname(data.user.fullname);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/cities', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.list) {
                    setCities(data.list.map(t => t.title));
                }
            })
            .catch(console.error);
    }, []);

    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'seller'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateFullname(fullname) {
        setFullname(fullname);
    }

    function updateEmail(email) {
        setEmail(email);
    }

    function updateCities(cities) {
        setCities(cities);
    }

    function addCity(city) {
        setCities(pre => [...pre, city]);
    }

    function deleteCity(city) {
        setCities(pre => pre.filter(title => title !== city));
    }

    function changeCity(oldCityName, newCityName) {
        setCities(pre => pre.map(title => title === oldCityName ? newCityName : title));
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        fullname,
        updateFullname,
        email,
        updateEmail,
        cities,
        addCity,
        updateCities,
        deleteCity,
        changeCity,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};