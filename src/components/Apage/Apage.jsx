import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NewStoryForm from "../stories/stories";
import { Switch } from "antd";
import NewInvitationForm from "../invitation/invitation";

function Apage() {
    const params = useParams();
    const books = useSelector(store => store.books);
    const stories = useSelector(store => store.stories);
    
    const dispatch = useDispatch();
    const [switchText, setSwitchText] = useState(false);
    const handClick = () => {
        switchText ? setSwitchText(false) : setSwitchText(true);
    }
    const id = +params.id;
    console.log("param", id);
    useEffect(() => {
        // Check if we have books, if not, fetch books
        if (books.length === 0) {
            dispatch({ type: 'FETCH_BOOK' });
        }
        // Check if we have stories, if not, fetch stories
        if (stories.length === 0) {
            dispatch({ type: 'FETCH_STORIES' });
        }
    }, [dispatch, books, stories]);

    // If we don't have any books, render "No Books"
    if (books.length === 0) {
        return (
            <h1>No Books yet</h1>
        )
    }

    // array.find((item) => item.id === 2);
    const book = books.find((book) => book.id === id);
    const filteredStories = stories.filter(story => story.book_id === id);

    return (
        <div>
            <h1>{book.title}</h1>
            {filteredStories.map((story) => (
                <p key={story.id}>{story.content}</p>
            ))}
            <div>
                <Switch onClick={handClick} />
                {switchText ? <span>locked</span> : <span>Unlock</span>}
            </div>
            <div>
                {/* <NewStoryForm />
                <NewInvitationForm /> */}
            </div>
        </div>
    );
}

export default Apage;