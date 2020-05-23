import compressQuery from 'utils/compressQuery';

export const joinRoom = code =>
  compressQuery(`
    mutation ($input: UpdateAccountInput!) {
      updateAccount (input: $input) {
        displayName
        id
        strokeColor
        strokeWidth
      }
      joinRoom(code: "${code}") {
        chat {
          id
          sender
          text
          timestamp
          type
        }
        code
        createdBy
        createdOn
        drawing {
          lines {
            start {
              offsetX
              offsetY
            }
            start {
              offsetX
              offsetY
            }
          }
          strokeColor
          strokeWidth
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
    mutation ($input: DrawingInput!) {
      sendDrawing(code: "${code}", input: $input) {
        lines {
          start {
            offsetX
            offsetY
          }
          stop {
            offsetX
            offsetY
          }
        }
        strokeColor
        strokeWidth
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
