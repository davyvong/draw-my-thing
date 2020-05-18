import { useContext } from 'react';

import DialogContext from 'states/Dialog';

const useDialog = () => useContext(DialogContext);

export default useDialog;
