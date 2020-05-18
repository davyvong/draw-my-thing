import { useContext } from 'react';

import LayoutContext from 'states/Layout';

const useLayout = () => useContext(LayoutContext);

export default useLayout;
