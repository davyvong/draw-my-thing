import React, { useMemo } from 'react';
import uuidv4 from 'uuid/v4';

import { randomNumber } from './helpers';
import { Text } from './styled';

const ArticlePlaceholder = () => {
  const placeholdersA = useMemo(() => {
    const length = randomNumber(5, 8);
    return Array.from({ length }, (_, index) => {
      const props = {
        key: uuidv4(),
        margin: '1.5rem',
        width: `${randomNumber(50, 70)}%`,
      };
      if (index === 0) {
        props.margin = '2rem 1.5rem 1rem 1.5rem';
      } else if (index === length - 1) {
        props.margin = '1.5rem 1.5rem 0.5rem 1.5rem';
      }
      return <Text {...props} />;
    });
  }, []);

  const placeholdersB = useMemo(() => {
    const length = randomNumber(5, 8);
    return Array.from({ length }, (_, index) => {
      const props = {
        key: uuidv4(),
        margin: '1.5rem',
        width: `${randomNumber(50, 70)}%`,
      };
      if (index === 0) {
        props.margin = '2rem 1.5rem 1rem 1.5rem';
      } else if (index === length - 1) {
        props.margin = '1.5rem 1.5rem 0.5rem 1.5rem';
      }
      return <Text {...props} />;
    });
  }, []);

  return (
    <React.Fragment>
      <Text margin="5rem 1.5rem 1rem 1.5rem" />
      <Text margin="1rem 1.5rem 2.5rem 1.5rem" width="30%" />
      {placeholdersA}
      <Text margin="2.5rem 1.5rem 1rem 1.5rem" />
      <Text margin="1rem 1.5rem 2.5rem 1.5rem" width="30%" />
      {placeholdersB}
    </React.Fragment>
  );
};

export default ArticlePlaceholder;
