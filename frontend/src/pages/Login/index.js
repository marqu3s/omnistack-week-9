import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    // App states
    const [email, setEmail] = useState('');

    // Handles form submit
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email });

        // Store user ID in the browser localstorage
        const { _id } = response.data;
        localStorage.setItem('user', _id);

        // Redirect to dashboard page
        history.push('/dashboard');
    };

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}