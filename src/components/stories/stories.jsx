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
            <h2 className='invitation2'>Edit Book</h2>
            <p className='invitation22'>Start to edit the book⇩</p>
            <form onSubmit={handleSubmit} className="add-story-form">
                <textarea className='textarea'
                    required
                    placeholder='here we go'
                    value={content}
                    onChange={(event) => setContent(event.target.value)} >

                </textarea>
                <div className='invitation2'>
                    <button type="submit">
                        submit
                    </button>
                </div>
            </form>
        </section>
    )

}
export default NewStoryForm;