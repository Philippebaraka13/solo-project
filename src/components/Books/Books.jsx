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
    const bookContent = useSelector(store => store.bookContent);
    console.log('bookContent', bookContent);
    console.log(books)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOK' });
        dispatch({ type: 'FETCH_BOOK_CONTENT' });
    }, [dispatch]);

    const updateBook = (book) => {
        // event.preventDefault();
        dispatch({
            type: 'UPDATE_BOOK',
            payload: book.id

        });

        console.log('BOOKS', book);
        console.log('BOOKS ID', book.id);

    }

    const deleteBook = (book) => {
        console.log("sada", book.id);
        dispatch({ type: 'DELETE_BOOK', payload: book.id })
        dispatch({ type: 'DELETE_STORY', payload: book.id })
        dispatch({ type: 'DELETE_INVITATION', payload: book.id })

    }

    return (


<div className='userpage'>
        <div className="table2">

            <h2 className="h22">Books</h2>
            <table>
                <tbody>
                    <tr className="tr">
                        <th>Title</th>
                        <th>Description</th>
                        <th>View Book</th>
                        <th>Delete Book</th>
                        <th>Complete Book</th>
                        <th>true/false</th>
                        {/* <th>Begin to write</th> */}
                    </tr>
                    {bookContent.map(books => (
                        <tr key={books.id}>
                            <td>{books.title}</td>
                            <td>{books.description}</td>
                            <td>
                                <Link to={`/books/${books.id}`}>Detail</Link>
                            </td>
                            <td>
                                <button onClick={() => {
                                    deleteBook(books)
                                    dispatch({ type: 'FETCH_BOOK' });
                                }}>Delete</button>
                            </td>
                            <td>
                                <button onClick={async () => {
                                    updateBook(books)
                                    dispatch({ type: 'FETCH_BOOK' });
                                }}>complete</button>
                            </td>
                            <td>{books.complete ? 'yes' : 'no'}</td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>
            <NewBookForm />

            <h2 className="h23">invitations books</h2>
            <table>
                <tbody>
                    <tr className="tr">
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
                                <button onClick={() => {
                                    deleteBook(book)
                                    dispatch({ type: 'FETCH_BOOK' });
                                    dispatch({ type: 'FETCH_BOOK_CONTENT' });
                                }}>Delete</button>
                            </td>

                        </tr>

                    ))
                    }
                </tbody>
            </table>

        </div >
        </div>
    )
}
export default Books;