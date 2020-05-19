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
      case 'setCreatingRoom': {
        draft.creatingRoom = action.data;
        return draft;
      }
      case 'setJoiningRoom': {
        draft.joiningRoom = action.data;
        return draft;
      }
      default:
        return draft;
    }
  });
}

export default reducer;
