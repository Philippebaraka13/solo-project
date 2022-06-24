const displayInvitation=(state =[], action) =>{
    switch(action.type) {
      case 'SET_INVITATION':
        return action.payload;
        default:
          return state;
    }
  };
  export default displayInvitation;