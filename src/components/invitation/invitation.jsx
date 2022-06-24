import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
const NewInvitationForm = (props) => {
    const params = useParams();
    const [invitation, setInvitation] = useState('');
    const id = +params.id;

    const dispatch = useDispatch();
    // const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Adding invitation`, { invitation });

        dispatch({
            type: 'ADD_INVITATION',
            payload: { invitation: invitation, id:id }
        });
        // history,push('/');
    };
    return (
        <section>
            <h2>Invite Author</h2>
            <form onSubmit={handleSubmit} className="add-invitation-form">
                <input className='invitation'
                    required
                    placeholder='invite'
                    value={invitation}
                    onChange={(event) => setInvitation(event.target.value)} 

                />
                <div>
                    <button type="submit">
                        submit
                    </button>
                </div>
            </form>
        </section>
    )

}
export default NewInvitationForm;