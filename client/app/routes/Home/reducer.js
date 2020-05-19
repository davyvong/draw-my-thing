import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'setDisplayNameError': {
        draft.displayNameError = action.error;
        return draft;
      }
      case 'setRoomCode': {
        draft.roomCode = action.data;
        return draft;
      }
      case 'setRoomCodeError': {
        draft.roomCodeError = action.error;
        return draft;
      }
      default:
        return draft;
    }
  });
}

export default reducer;
