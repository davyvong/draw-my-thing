import compressQuery from 'utils/compressQuery';

export const findRoom = code =>
  compressQuery(`
    query {
      findRoom(code: "${code}") {
        chat {
          id
          sender
          text
          timestamp
        }
        code
        createdBy
        createdOn
        drawing {
          start {
            offsetX
            offsetY
          }
          start {
            offsetX
            offsetY
          }
        }
        drawingPlayer
        gameStarted
        id
        players {
          displayName
          id
        }
        secretWord
      }
    }
`);

export const sendMessage = ({ code, message }) =>
  compressQuery(`
    mutation {
      sendMessage(code: "${code}", message: "${message}") {
        id
        sender
        timestamp
        text
        type
      }
    }
`);

export const sendDrawing = ({ code }) =>
  compressQuery(`
    mutation ($input: [LineInput!]!) {
      sendDrawing(code: "${code}", input: $input) {
        start {
          offsetX
          offsetY
        }
        stop {
          offsetX
          offsetY
        }
      }
    }
`);

export const roomEvents = compressQuery(`
  subscription {
    roomEvents {
      code
      data
      type
    }
  }
`);
