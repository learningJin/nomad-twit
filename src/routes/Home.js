import { dbService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [twit, setTwit] = useInput('');
    const [twits, setTwits] = useState([]);

    const getTwits = async () => {
        const res = await dbService
            .collection("twits").orderBy("createAt", "asc")
            .get();
        const arr = res.docs.map( doc => {
            return { ...doc.data(), id:doc.id } 
        });
        setTwits([...arr]);
    }

    useEffect( () => {
        getTwits();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection('twits').add({
            twit : twit.value,
            createAt : Date.now(),
        });
        setTwit('');
        getTwits();
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input type="text" placeholder="twit" maxLength={120} {...twit} />
                <input type="submit" value="Twit" />
            </form>
            <div>
                <ul>{
                    twits.map( (item, index) => (
                        <li key={index}>{item.twit}</li>
                    ))
                }</ul>
            </div>
        </div>
    )
}

export default Home;