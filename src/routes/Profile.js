import Twit from 'components/Twit';
import { authService, dbService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useInput(userObj.displayName);
    const [myTwits, setMyTwits] = useState([]);

    const onSignOutClick = () => {
        authService.signOut();
        history.push('/');
    }

    const getMyTwits = async () => {
        const res = await dbService.collection('twits')
            .where('creatorId', '==', userObj.uid)
            .orderBy('createdAt', 'desc')
            .get();

        const myTwits = res.docs.map(doc => doc.data());
        setMyTwits(myTwits);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName.value) {
            const res = await userObj.updateProfile({
                displayName: newDisplayName.value,
            });
            refreshUser();
            console.log(res);
        }
    }

    useEffect(() => {
        getMyTwits();
    }, []);


    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="display name" {...newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <>
                {
                    myTwits.map(item => <Twit twitObj={item} isOwner={true} />)
                }
            </>
            <button onClick={onSignOutClick}>Sign out</button>
        </>
    )
}

export default Profile;