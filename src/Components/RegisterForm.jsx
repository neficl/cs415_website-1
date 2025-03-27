import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

export const RegisterForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        let success = true
        let errorText = ''
        const payload = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: pass
        })
        try {
            fetch(process.env.REACT_APP_API_URL_BASE + '/users/',{
            method: 'POST',
            body: payload,
            headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => {
                    console.log(res)
                    if (!res.ok){
                        errorText = "Error: " + res.status + ' - '
                        success = false
                        return res.json()
                    }
                    else {
                        success = true
                        return res.json()
                    }
                 }
              ).then(data => {
                if (!success) {
                    for (const err in data.errors){
                    for (const msg in data.errors[err]) errorText += data.errors[err][msg]
                    }
                    console.log(errorText)
                    setError(errorText)
                }

            })
            .catch(error => {
                success = false
                console.error(error)
            });
            if (success) {
                setEmail('')
                setFirstName('')
                setLastName('')
                setPass('')
                setError('Registered Successfully!')
            }
            else{
                setError(errorText)
            }
        } catch (error) {
            console.error(error);
            setError('Error Registering - Check your information and try again')
        }

    }

    return (
        <div >
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="login-label" htmlFor="firstName">First Name</label>
                <input className="login-input" required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" id="firstName" name="firstName"/>
                <label className="login-label" htmlFor="lastName">Last Name</label>
                <input className="login-input" required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" id="lastName" name="lastName"/>
                <label className="login-label" htmlFor="email">Email</label>
                <input className="login-input" required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email"/>
                <label className="login-label" htmlFor="password">Password</label>
                <input className="login-input" required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
                <button className="login-button" type="submit">Register</button>
                <p color="white"><b>{error}</b></p>
            </form>

            <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>

        </div>
    )
}

export default RegisterForm;