import { checkPropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NewInvitationForm from "../invitation/invitation";
import NewBookForm from "../newPage/newPage";
import './Books.css';

function Books() {
    const books = useSelector(store => store.books);
    const story = useSelector(store => store.stories);
    const invitation = useSelector(store => store.invitation);
    const [completeBook, setCompleteBook] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOK' });
    }, [dispatch]);

    const updateBook = (book) => {
        // event.preventDefault();
        dispatch({
            type: 'UPDATE_BOOK',
            payload: book.id

        });
        setCompleteBook(true);

        console.log('BOOKS',book);
        console.log('BOOKS ID',book.id);
    }

    const deleteBook = (book) => {
        console.log("sada", book.id);
        dispatch({ type: 'DELETE_BOOK', payload: book.id })
        dispatch({ type: 'DELETE_STORY', payload: book.id })
        dispatch({ type: 'DELETE_INVITATION', payload: book.id })


    }

    return (

        <div className="table2">

            <h2>Books</h2>
            <table>
                <tbody>
                    <tr className="tr">
                        <th>Title</th>
                        <th>Description</th>
                        <th>View Book</th>
                        <th>Delete Book</th>
                        <th>Complete</th>
                        <th>true/false</th>
                        {/* <th>Begin to write</th> */}
                    </tr>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>
                                <Link to={`/books/${book.id}`}>Detail</Link>
                            </td>
                            {/* <Link to={`/books/${book.id}`}>Begin</Link> */}
                            <td>
                                {/* <span>{books.id}</span> */}
                                <button onClick={() => deleteBook(book, story, invitation)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => updateBook(book)}>complete{book.complete}</button>
                            </td>
                            <td>{completeBook? 'True': 'False'}</td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>
            <NewBookForm />

        </div >
    )
}
export default Books;