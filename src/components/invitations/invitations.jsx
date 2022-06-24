import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NewStoryForm from "../stories/stories";
import { Switch } from "antd";
import NewInvitationForm from "../invitation/invitation";


function Invitations() {
    const params = useParams();
    const books = useSelector(store => store.books);
    const invitation = useSelector(store => store.invitation);
    const dispatch = useDispatch();
    const id = +params.id;
    console.log('param', id);
    useEffect(() => {
        if (books && books.length === 0) {
            dispatch({ type: 'FETCH_BOOK' });
        }
        if (invitation && invitation.length === 0) {
            dispatch({ type: 'FETCH_INVITATION' });
        }
    }, [dispatch, books, invitation]);

    if (books.length === 0) {
        return (
            <h1>No Books invitation yet</h1>
        )
    }

    const book = books.find((book) => book.id === id);
    // const filteredInvitation = invitation.filter(invitations => invitations.book_id === id);


    return (
        <>
            <h1> invitations </h1>
            <div>
                <h1>Book Title: {books[0].title}</h1>
                {/* <Link to={`/books/${book.id}`}>View Book</Link> */}
            </div>
            <h2>Description of the book: {books[0].description}</h2>


        </>
    )
}

export default Invitations;


