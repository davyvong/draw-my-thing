import Button from 'components/Button';
import BrokenRobotSVG from 'images/broken-robot.svg';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

import messages from './messages';
import { Actions, Container, Image, Subtitle, Title } from './styled';

const NotFoundRoute = () => {
  const history = useHistory();

  const goBack = useCallback(() => {
    if (history.length > 1) {
      history.goBack();
    } else {
      goHome();
    }
  }, [history]);

  const goHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{messages.title}</title>
      </Helmet>
      <Container>
        <center>
          <Title>{messages.title}</Title>
          <Subtitle>{messages.subtitle}</Subtitle>
          <Actions>
            <Button onClick={goBack}>Go Back</Button>
            <Button onClick={goHome}>Go Home</Button>
          </Actions>
          <Image src={BrokenRobotSVG} />
        </center>
      </Container>
    </React.Fragment>
  );
};

export default NotFoundRoute;
