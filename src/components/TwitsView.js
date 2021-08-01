import React from 'react';
import Twit from './Twit';

const TwitsView = ({twits, userObj}) => {

    return (
        <div>
            {twits.map((item, index) => (
                <Twit twitObj={item}
                    isOwner={userObj.uid === item.creatorId}
                    key={index}
                />
            ))}
        </div>
    );
}

export default TwitsView;