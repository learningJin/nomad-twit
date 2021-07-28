import Twit from 'components/Twit';
import { dbService, storageService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [twit, setTwit] = useInput('');
    const [twits, setTwits] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        dbService.collection('twits').onSnapshot(snapshot => {
            const arr = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            });
            setTwits([...arr]);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // dbService.collection('twits').add({
        //     text: twit.value,
        //     createAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // setTwit('');
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const res = await fileRef.putString(attachment, 'data_url');
        console.log(res);
    }
    

    const onFileChange = (event) => {
        const { files } = event.target;
        const theFile = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearPhoto = (event) => {
        setAttachment(null)
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input type="text" placeholder="twit" maxLength={120} {...twit} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Twit" />
                { attachment && (
                <div>
                <img src={attachment} width="50px" height="auto" />
                <button onClick={onClearPhoto}>clear</button>
                </div>) }
            </form>
            <div>
                {
                    twits.map((item, index) => (
                        <Twit twitObj={item} isOwner={userObj.uid === item.creatorId} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;