import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'foundRoom': {
        const { chat, code, players } = action.data;
        draft.chat = chat;
        draft.code = code;
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
