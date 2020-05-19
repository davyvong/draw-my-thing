import { useContext } from 'react';

import ProfileContext from 'states/Profile';

const useProfile = () => useContext(ProfileContext);

export default useProfile;
