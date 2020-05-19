import React, { useMemo } from 'react';
import uuidv4 from 'uuid/v4';

import { randomNumber } from '../helpers';
import { Rectangle, Text } from '../styled';
import { Wrapper } from './styled';

const GridCardPlaceholder = () => {
  const placeholders = useMemo(
    () =>
      Array.from({ length: randomNumber(3, 5) }, () => (
        <Wrapper key={uuidv4()}>
          <Text margin="0 0 1rem 0" width={`${randomNumber(30, 50)}%`} />
          <Text margin="0" width={`${randomNumber(60, 80)}%`} />
          <Rectangle height="7rem" margin="1.5rem 0 0 0" width="100%" />
        </Wrapper>
      )),
    [],
  );

  return <React.Fragment>{placeholders}</React.Fragment>;
};

export default GridCardPlaceholder;
