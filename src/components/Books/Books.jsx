import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NewInvitationForm from "../invitation/invitation";
import NewBookForm from "../newPage/newPage";



function Books() {
    const books = useSelector(store => store.books)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOK' });
    }, [dispatch]);

    return (
        <div>
            <h2>Books</h2>
            {books.map(book => (
                <div key={book.id}>
                    <h4>{book.title}</h4>
                    <p>{book.description}</p>
                    <div>
                        <Link to={`/books/${book.id}`}>View Book</Link>
                    </div>
                    <Link to={`/books/${book.id}`}>Begin to write</Link>
                </div>
            ))}
            
            <NewBookForm />

        </div>
    )
}
export default Books;