import produce from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'setProfile': {
        const displayName = { displayName: draft.displayName || action.data.displayName || '' };
        Object.assign(draft, action.data, displayName);
        const { token, ...profile } = draft;
        localStorage.setItem('profile', JSON.stringify(profile));
        return draft;
      }
      case 'setDisplayName': {
        draft.displayName = action.data;
        const { token, ...profile } = draft;
        localStorage.setItem('profile', JSON.stringify(profile));
        return draft;
      }
      case 'setToken': {
        draft.token = action.data;
        localStorage.setItem('token', action.data);
        return draft;
      }
      case 'setTool': {
        draft.tool = action.data;
        const { token, ...profile } = draft;
        localStorage.setItem('profile', JSON.stringify(profile));
        return draft;
      }
      case 'setStrokeColor': {
        draft.strokeColor = action.data;
        const { token, ...profile } = draft;
        localStorage.setItem('profile', JSON.stringify(profile));
        return draft;
      }
      case 'setStrokeWidth': {
        draft.strokeWidth = action.data;
        const { token, ...profile } = draft;
        localStorage.setItem('profile', JSON.stringify(profile));
        return draft;
      }
      case 'rehydrate': {
        const localProfile = localStorage.getItem('profile');
        if (localProfile) {
          const localProfileJson = JSON.parse(localProfile);
          Object.assign(draft, localProfileJson);
        }
        draft.token = localStorage.getItem('token');
        return draft;
      }
      default:
        return draft;
    }
  });
}

export default reducer;
