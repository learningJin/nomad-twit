import Twit from 'components/Twit';
import TwitFactory from 'components/TwitFactory';
import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';


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
            <div>
                {twits.map((item, index) => (
                    <Twit twitObj={item}
                        isOwner={userObj.uid === item.creatorId}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;