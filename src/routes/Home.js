import React, { useEffect, useState } from 'react';
import { dbService } from 'fBase';

import TwitFactory from 'components/TwitFactory';
import TwitsView from 'components/TwitsView';

const Home = ({ userObj }) => {
    const [twits, setTwits] = useState([]);

    useEffect(async () => {
        const unsubscribe = await dbService.collection('twits').onSnapshot(snapshot => {
            const arr = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            });
            setTwits([...arr]);
        })

        return unsubscribe;
    }, []);

    return (
        <div>
            <TwitFactory userObj={userObj} />
            <TwitsView twits={twits} userObj={userObj} />
        </div>
    )
}

export default Home;