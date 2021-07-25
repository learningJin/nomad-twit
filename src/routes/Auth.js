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

    const onSubmit = () => {
        console.log('submit')
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" required {...email} />
                <input type="password" placeholder="password" required {...password} />
                <input type="submit" value="Login" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Gighub</button>
            </div>
        </div>
    )
}

export default Auth;