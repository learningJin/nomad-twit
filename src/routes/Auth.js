import React from 'react';
import { authService, firebaseInstance } from 'fBase';

import AuthForm from 'components/AuthForm';

const Auth = () => {
    const onSocialClick = async (event) => {
        const name = event.target.name;
        let provider;

        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
            provider.setCustomParameters({
                login: 'true'
            });
        }

        const data = await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;