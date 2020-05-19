import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'request':
        draft.pending = true;
        return draft;
      case 'success':
        draft.error = null;
        draft.data = action.data;
        draft.pending = false;
        return draft;
      case 'failure':
        draft.data = {};
        draft.error = action.error;
        draft.pending = false;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
