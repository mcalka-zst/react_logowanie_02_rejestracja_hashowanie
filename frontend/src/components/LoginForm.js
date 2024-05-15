import { useState} from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const [error, setError] = useState('')
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wysyłamy zapytanie do bazy danych, aby sprawdzić istnienie użytkownika i pobrać imię i nazwisko
        try {
            const response = await fetch('http://localhost:8081/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user,password}),
                });
            if (response.ok) {
                const res = await response.json();
                console.log(res); 
                if(res.success){
                    onLogin({ name: res.data[0].name, surname: res.data[0].surname })              
                }
                else{
                    setError(res.message);
                }
            }
        }
        catch (err) {
            setError('Wystąpił błąd: \n'+ err);
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Login:<br />
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} id="name" name="name" autoComplete="on" placeholder="Login"/><br />
            </label>
            <label>
                Hasło:<br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="surname" name="surname" autoComplete="on" placeholder="Hasło"/> <br /> <br />
            </label>
            <button type="submit">Zaloguj</button>
            
            <p className="error">{error}</p>
            <Link to="/register">Zarejestruj</Link>
        </form>
    )

}
export default LoginForm;