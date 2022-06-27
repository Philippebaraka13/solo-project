import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './stories.css';
import { useParams } from "react-router-dom";
const NewStoryForm = (props) => {
    const params = useParams();
    const [content, setContent] = useState('');
    const id = +params.id;

    const dispatch = useDispatch();
    // const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Adding story`, { content });

        dispatch({
            type: 'ADD_STORY',
            payload: { content: content, id:id }
        });
        setContent('');
        // history,push('/');
    };
    return (
        <section>
            <h2>Add content</h2>
            <form onSubmit={handleSubmit} className="add-story-form">
                <textarea className='textarea'
                    required
                    placeholder='here we go'
                    value={content}
                    onChange={(event) => setContent(event.target.value)} >

                </textarea>
                <div>
                    <button type="submit">
                        submit
                    </button>
                </div>
            </form>
        </section>
    )

}
export default NewStoryForm;