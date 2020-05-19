import produce from 'immer';

const localStorageKey = 'profile';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'setData': {
        Object.assign(draft, action.data);
        const profileData = JSON.stringify(draft);
        localStorage.setItem(localStorageKey, profileData);
        return draft;
      }
      case 'rehydrate': {
        const profileData = localStorage.getItem(localStorageKey);
        const profileJson = JSON.parse(profileData);
        return Object.assign(draft, profileJson);
      }
      default:
        return draft;
    }
  });
}

export default reducer;
