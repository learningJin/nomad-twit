import { authService, firebaseInstance } from 'fBase';
import React, { useState } from 'react';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange,
    }
}

const Auth = () => {
    const email = useInput('');
    const password = useInput('');

    const [newAccount, setNewAccount] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                // sign up
                data = await authService.createUserWithEmailAndPassword(email.value, password.value);
            } else {
                // sign in
                data = await authService.signInWithEmailAndPassword(email.value, password.value);
            }
            console.log(data);
        } catch(error) {
            console.log(error);
            setErrorMsg(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount( prev => !prev );
    }

    const onSocialClick = async (event) => {
        const name = event.target.name;
        
        let provider;
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
        } else if(name === 'github'){
            provider = new firebaseInstance.auth.GithubAuthProvider();
            provider.setCustomParameters({
                login : 'true'
            });
        }


        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" required {...email} />
                <input type="password" placeholder="password" required {...password} />
                <input type="submit" value={newAccount ? 'Create Account' : 'Sign in'} />
                <span>{errorMsg}</span>
            </form>
            <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'CreateAccount'}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;