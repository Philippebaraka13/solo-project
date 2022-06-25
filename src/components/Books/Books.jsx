import { checkPropTypes } from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NewInvitationForm from "../invitation/invitation";
import NewBookForm from "../newPage/newPage";
import './Books.css';


function Books() {
    const books = useSelector(store => store.books);
    const story = useSelector(store => store.stories);
    const invitation = useSelector(store => store.invitation);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOK' });
    }, [dispatch]);

    const deleteBook = (books, story, invitation) => {
        console.log("sada", books.id);
        dispatch({ type: 'DELETE_BOOK', payload: books.id })
        dispatch({ type: 'DELETE_STORY', payload: books.id })
        dispatch({ type: 'DELETE_INVITATION', payload: books.id })
        
    }

    return (

        <div className="table2">

            <h2>Books</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>View Book</th>
                        <th>Delete Book</th>
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
                                <button onClick={() => deleteBook(book,story, invitation)}>Delete</button>
                            </td>
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