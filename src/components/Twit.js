import { dbService } from 'fBase';
import useInput from 'hooks/useInput';
import React, { useState } from 'react';

const Twit = ({ twitObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTextInputSet, setNewText] = useInput(twitObj.text);

    const onDelete = async () => {
        const confirm = window.confirm('really do you want to delete?');
        if (confirm) {
            await dbService.doc(`twits/${twitObj.id}`).delete();
        }
    }

    const toggleEdit = () => {
        setEditing(!editing);
    }

    const onUpdate = async (event) => {
        event.preventDefault();
        await dbService.doc(`twits/${twitObj.id}`).update({
            text : newTextInputSet.value,
        });
        toggleEdit();
    }

    return (
        <div>
            {
                editing ? (
                    <form onSubmit={onUpdate}>
                        <input type="text" {...newTextInputSet} required />
                        <button onClick={toggleEdit}>Cancel</button>
                        <input type="submit" value="Done" />
                    </form>
                ) : (
                    <>
                        <h4>{twitObj.text}</h4>
                        {
                            isOwner && (
                                <>
                                    <button onClick={toggleEdit}>Edit</button>
                                    <button onClick={onDelete}>Delete</button>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );

}

export default Twit;