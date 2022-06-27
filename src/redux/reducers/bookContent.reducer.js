const displayContent=(state =[], action) =>{
    switch(action.type) {
      case 'SET_BOOK_CONTENT':
        return action.payload;
        default:
          return state;
    }
  };
  export default displayContent;