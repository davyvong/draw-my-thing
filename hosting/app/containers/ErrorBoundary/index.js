import BrokenRobotSVG from 'images/broken-robot.svg';
import PropTypes from 'prop-types';
import React from 'react';

import BackButton from './components/BackButton';
import HomeButton from './components/HomeButton';
import messages from './messages';
import { Actions, Container, Image, Subtitle, Title } from './styled';

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <Container>
          <center>
            <Title>{messages.title}</Title>
            <Subtitle>{error.toString()}</Subtitle>
            <Actions>
              <BackButton>Go Back</BackButton>
              <HomeButton>Go Home</HomeButton>
            </Actions>
            <Image src={BrokenRobotSVG} />
          </center>
        </Container>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ErrorBoundary;
