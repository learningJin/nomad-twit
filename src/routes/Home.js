import React from 'react';

const Home = () => {

    return (
        <div>
            <form>
                <input type="text" placeholder="twit" maxLengh={120} />
                <input type="submit" value="Twit" />
            </form>
        </div>
    )
}

export default Home;