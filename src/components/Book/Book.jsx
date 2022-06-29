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
console.log('booooks', books)
    const dispatch = useDispatch();
    const [switchText, setSwitchText] = useState(false);
    const handClick = () => {
        switchText ? setSwitchText(false) : setSwitchText(true);
    }
    const id = +params.id;
    console.log("paramsssssssssssssss", id);
    useEffect(() => {
        // Check if we have books, if not, fetch books
        if (bookContent.length === 0) {
            dispatch({ type: 'FETCH_BOOK_CONTENT' })
        }
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
            <h1>No invitation yet</h1>
        )
    } else if (bookContent.length === 0) {
        return (
            <h1>No Books yet</h1>
        )
    }
let number = [];
    // array.find((item) => item.id === 2);
    let book1 = bookContent.find((book) => book.id === id);
    number.push(book1);
    let book = books.find((book) => book.id === id);
    number.push(book);
    const filteredStories = stories.filter(story => story.book_id === id);
console.log("array", number);
let booknew =[];
for( let i=0; i<number.length; i++){
    if(number[0] === undefined){
        booknew.push(number[1]);
    }else if (number[1] === undefined){
        booknew.push(number[0])
    }else if (number[0] !== undefined && number[1] !== undefined){
        booknew.push(number[i])
    }
   
}

console.log("booknew", booknew);
return (
        <div>
            {booknew.map((book) =>(
                <h1>{book.title}</h1>
            ))}
            {/* <h1>{book.title}</h1> */}
            
            {filteredStories.map((story) => (
                <p key={story.id}>{story.content}</p>
            ))}
            <div>
                <Switch onClick={handClick} />
                {switchText ? <span>locked</span> : <span>Unlock</span>}
            </div>
            <div>
                <NewStoryForm />
                <NewInvitationForm />
            </div>
        </div>
    );
}

export default Book;