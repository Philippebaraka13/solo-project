import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NewStoryForm from "../stories/stories";
import { Switch } from "antd";
import NewInvitationForm from "../invitation/invitation";

function Book() {
    const params = useParams();
    const books = useSelector(store => store.books);
    const stories = useSelector(store => store.stories);
    const bookContent = useSelector(store => store.bookContent);
    const user = useSelector(store => store.user);
    console.log('booooks', books)
    const dispatch = useDispatch();
   



    const handClick = () => {
        dispatch ({type: 'SET_BOOK_LOCK', payload: book.id})

    }
    const id = +params.id;
    console.log("paramsssssssssssssss", id);
    useEffect(() => {
        // Check if we have books, if not, fetch books
        if (books.length === 0 || bookContent.length === 0) {
            dispatch({ type: 'FETCH_BOOK' });
        }
        // Check if we have stories, if not, fetch stories
        if (stories.length === 0) {
            dispatch({ type: 'FETCH_STORIES' });
        }
    }, [dispatch, books.length, stories.length]);

    let book = books.find((book) => book.id === id);
    if (book === undefined) {
        book = bookContent.find((book) => book.id === id);
    }

    if (book === undefined) {
        return <h1>book not found</h1>
    }

    const filteredStories = stories.filter(story => story.book_id === id);

    console.log("booknew", book);
    return (
        <div className="wrapper">
            <div className="divbook">
                
            <div title={book.title} class="cover">

            <h1>{book.title}</h1>
            {filteredStories.map((story) => (
                <p className="paral" key={story.id}>{story.content}</p>
                ))}
                </div>
                </div>
                <h3 className="isnotlock">{book.lock? 'is locked': "is not locked"}</h3>
            <div className="switch">
               {(book.user_id === user.id ) && <Switch checked={book.lock} onClick={handClick} />}
               
            </div>
            <div>
                { book.lock ? "please unlock to write new stories" : <NewStoryForm />}
                <NewInvitationForm />
            </div>
        </div>
    );
}

export default Book;