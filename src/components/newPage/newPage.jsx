import React, {useState}from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const NewBookForm = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] =useState('');
    // need to add the number of people 
    
    const dispatch =useDispatch();
    const history = useHistory();
    const handleSubmit = event =>{
        event.preventDefault();
        console.log(`Adding book`, {title, description, date});

        dispatch({
            type:'ADD_BOOK',
            payload: {title:title, description:description, date:date}
        });
        // history,push('/');
    };
    return (
        <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input 
          required 
          placeholder="Title" 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input 
          required 
          placeholder="Description" 
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input 
          required 
          placeholder="Date" 
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <button type="submit" >
          start new book 
        </button>
      </form>
    </section>
    )

}
export default NewBookForm;