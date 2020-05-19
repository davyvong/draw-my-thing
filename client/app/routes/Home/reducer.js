import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'setName': {
        draft.name = action.data;
        return draft;
      }
      case 'setRoomCode': {
        draft.roomCode = action.data;
        return draft;
      }
      default:
        return draft;
    }
  });
}

export default reducer;
