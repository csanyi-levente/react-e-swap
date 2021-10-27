import { useState } from "react"
import axios from "axios";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitForm(event) {
        event.preventDefault();

        const response = await axios.post('/api/users/signup', {
            email, password
        });

        console.log(response.data);
    }

    return (
        <form onSubmit={submitForm}>
            <h1>signup</h1>
            <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>
    )
}