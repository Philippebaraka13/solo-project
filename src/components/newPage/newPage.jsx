import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const NewBookForm = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  // need to add the number of people 

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Adding book`, { title, description, date });

    dispatch({
      type: 'ADD_BOOK',
      payload: { title: title, description: description, date: date }
    });
    setTitle('');
    setDescription('');
    setDate('');
    // history,push('/');
  };
  return (
    <section>
      <h2 className='h234'>Add New Book Here</h2>
      <h3 className='h3'>For date just enter "Now"</h3>
      <form onSubmit={handleSubmit} className="add-book-form">
<div class="form__group">
        <input
        type="text"
        class="form__input" id="name"
          required=""
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label for="name" class="form__label">Title</label>
       </div>
       <div class="form__group">
          <input
          type="text"
          class="form__input" id="name"
            required=""
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
           <label for="name" class="form__label">Description</label>
           </div>
           <div class="form__group">
          <input
           type="text"
           class="form__input" id="name"
            required
            placeholder="Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <label for="name" class="form__label">Date</label>
          </div>

          <button type="submit" className='form-submit-button' >
            submit
          </button>
      </form>
    </section>
  )

}
export default NewBookForm;