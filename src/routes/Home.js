import { dbService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [twit, setTwit] = useInput('');
    const [twits, setTwits] = useState([]);

    // const getTwits = async () => {
    //     const res = await dbService
    //         .collection("twits").orderBy("createAt", "asc")
    //         .get();
    //     const arr = res.docs.map(doc => {
    //         return { 
    //             ...doc.data(), 
    //             id: doc.id,
    //         }
    //     });
    //     setTwits([...arr]);
    // }

    useEffect(() => {
        //getTwits();
        dbService.collection('twits').onSnapshot( snapshot => {
            const arr = snapshot.docs.map(doc => {
                return { 
                    ...doc.data(), 
                    id: doc.id,
                }
            });
            setTwits([...arr]);
        })
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection('twits').add({
            text: twit.value,
            createAt: Date.now(),
            creatorId : userObj.uid,
        });
        setTwit('');
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input type="text" placeholder="twit" maxLength={120} {...twit} />
                <input type="submit" value="Twit" />
            </form>
            <div>
                <ul>{
                    twits.map((item, index) => (
                        <li key={index}>{item.text}</li>
                    ))
                }</ul>
            </div>
        </div>
    )
}

export default Home;