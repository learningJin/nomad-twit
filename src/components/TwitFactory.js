import React, {useState} from 'react';
import { dbService, storageService } from 'fBase';

import { v4 as uuidv4 } from 'uuid';
import useInput from 'hooks/useInput';

const TwitFactory = ({userObj}) => {

    const [twit, setTwit] = useInput('');
    const [attachment, setAttachment] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = '';
        if (attachment) {
            const attachmentRef =storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const res = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await res.ref.getDownloadURL();
        }

        const req = {
            text: twit.value,
            createdAt: Date.now(),
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
        <form onSubmit={onSubmit} >
                <input type="text" placeholder="twit" maxLength={120} {...twit} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Twit" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="auto" />
                        <button onClick={onClearPhoto}>clear</button>
                    </div>
                )}
        </form>
    )
}

export default TwitFactory;