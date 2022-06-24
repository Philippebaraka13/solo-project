const displayStories=(state =[], action) =>{
    switch(action.type) {
      case 'SET_STORIES':
        return action.payload;
        default:
          return state;
    }
  };
  export default displayStories;