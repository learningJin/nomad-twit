import React, { useState } from 'react';
import { authService } from 'fBase';

import useInput from 'hooks/useInput';

const AuthForm = () => {
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const [newAccount, setNewAccount] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // sign up
                data = await authService.createUserWithEmailAndPassword(email.value, password.value);
            } else {
                // sign in
                data = await authService.signInWithEmailAndPassword(email.value, password.value);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" required {...email} />
                <input type="password" placeholder="password" required {...password} />
                <input type="submit" value={newAccount ? 'Create Account' : 'Sign in'} />
                <span>{errorMsg}</span>
            </form>
            <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'CreateAccount'}</span>
        </>
    );
}

export default AuthForm;