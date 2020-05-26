import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'joinRoom': {
        const { players, ...data } = action.data;
        Object.assign(draft, data);
        draft.playerObjs = players.reduce((objs, p) => {
          objs[p.id] = p;
          return objs;
        }, {});
        draft.playerIds = new Set(players.map(p => p.id));
        return draft;
      }
      case 'joinedRoom': {
        const { id } = action.data;
        draft.playerObjs[id] = action.data;
        draft.playerIds.add(id);
        return draft;
      }
      case 'leftRoom': {
        const { id } = action.data;
        delete draft.playerObjs[id];
        draft.playerIds.delete(id);
        return draft;
      }
      case 'gameStart':
      case 'roundStart': {
        return Object.assign(draft, action.data);
      }
      case 'message': {
        draft.chat.push(action.data);
        return draft;
      }
      default:
        return draft;
    }
  });
}

export default reducer;
