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
          canvasHeight
          canvasWidth
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
          tool
        }
        drawingPlayer
        gameStarted
        id
        players {
          displayName
          id
        }
        roundEndTime
        roundStartTime
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
        canvasHeight
        canvasWidth
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

export const startGame = ({ code }) =>
  compressQuery(`
    mutation {
      startGame(code: "${code}") {
        id
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
