import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NewStoryForm from "../stories/stories";
import { Switch } from "antd";
import NewInvitationForm from "../invitation/invitation";
import { Link } from "react-router-dom";


function Invitations() {
    const params = useParams();
    const books = useSelector(store => store.books);
    const invitation = useSelector(store => store.invitation);
    const users = useSelector(store => store.user);
    console.log('invitation', invitation);
    console.log('user', users, books)
    const dispatch = useDispatch();
    const id = +params.id;
    console.log('param', params.id);

    useEffect(() => {
        if (books.length === 0) {
            dispatch({ type: 'FETCH_BOOK' });
        }
        if (invitation.length === 0) {
            dispatch({ type: 'FETCH_INVITATION' });
        }
        if (users.length === 0) {
            dispatch({ type: 'FETCH_USER' });
        }
    }, []);

    if (books.length === 0) {
        return (
            <h1>No Books invitation yet</h1>
        )

    }
    if (invitation.length === 0) {
        return (
            <h1>not</h1>
        )
    }

    const book = books.find((book) => book.id === id);
    console.log('idddddd', book);


    return (
        <>

            <div className="userpage" >
            <div className="invitationpage">
                <div className="content">
                    <h1 contenteditable data-heading="Dimensions" className="newInvitation">Invitations</h1>
                    <p className="pinvitation">these are the books that you were invited to participate in </p>
                </div>
                <div className="listnew">
                    {invitation.map(invitations => (
                        <span key={invitations.id} className="ul">
                            <h3>Title: {invitations.title}</h3>
                            <h3>book:  {invitations.description}</h3>

                            <button>
                                <Link to={`/books/${invitations.id}`}>view book</Link>
                            </button>
                        </span>

                    ))}
                </div>
                </div>
            </div>

        </>
    )
}
//invitation.id is book id 
export default Invitations;


