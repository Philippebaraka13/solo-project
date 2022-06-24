import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NewInvitationForm from "../invitation/invitation";
import NewBookForm from "../newPage/newPage";
import './Books.css';


function Books() {
    const books = useSelector(store => store.books)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOK' });
    }, [dispatch]);

    return (

        <div>
            <h2>Books</h2>
            <tbody>
                <table>
                    <tr>
                
                        <th>Title</th>
                        <th>Description</th>
                        <th>View Book</th>
                        {/* <th>Begin to write</th> */}
                    </tr>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>
                                <Link to={`/books/${book.id}`}>View</Link>
                            </td>
                            {/* <Link to={`/books/${book.id}`}>Begin</Link> */}

                        </tr>
                    ))
                    }
                </table>
            </tbody>
            <NewBookForm />

        </div >
    )
}
export default Books;