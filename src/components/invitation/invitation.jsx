import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
const NewInvitationForm = (props) => {
    const params = useParams();
    const [invitation, setInvitation] = useState('');
    const [message, setMessage] = useState('');
    const id = +params.id;


    // email verification 
    const emailValidation = () => {

        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (regEx.test(invitation)) {
            setMessage('Email is valid');

        } else if (!regEx.test(invitation) && invitation !== "") {
            setMessage("Email is not Valid");
        } else {
            setMessage("");
        }

    }

    const dispatch = useDispatch();
    // const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Adding invitation`, { invitation });

        dispatch({
            type: 'ADD_INVITATION',
            payload: { email: invitation, book_id: id }
        });
        setInvitation('')
    };
    return (
        <section>
            <h2 className='author'>Invite Author Here</h2>
            <form onSubmit={handleSubmit} className="add-invitation-form">
                <div class="form__group">
                    <input
                        type="text"
                        class="form__input" id="name"
                        required=""
                        placeholder='email'
                        value={invitation}
                        onChange={(event) => {
                            setInvitation(event.target.value);
                            emailValidation()
                        }}
                    />
                    <div>
                    <button> submit </button>
                    {message}
                    </div>
                </div>
              
            </form>
        </section>
    )

}
export default NewInvitationForm;