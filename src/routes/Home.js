import Twit from 'components/Twit';
import { dbService, storageService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [twit, setTwit] = useInput('');
    const [twits, setTwits] = useState([]);
    const [attachment, setAttachment] = useState(null);

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

        let attachmentUrl = '';
        if(attachment){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const res = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await res.ref.getDownloadURL();
        }

        const req = {
            text: twit.value,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        console.log(req);
        dbService.collection('twits').add(req);
        setTwit('');
        setAttachment(null);

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