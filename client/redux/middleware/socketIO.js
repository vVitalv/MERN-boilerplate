import { io } from 'socket.io-client'

const socketIOMiddleware = () => {
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, {
      path: '/ws',
      autoConnect: false
    })

    const { dispatch, getState } = store
    // eslint-disable-next-line
    console.log('Store', !!dispatch && !!getState)

    socket.on('SOCKET_IO', (message) => {
      switch (message.type) {
        case 'message:get': {
          // eslint-disable-next-line
          console.log(message.payload)
          break
        }
        default: {
          // eslint-disable-next-line
          console.log('Server Message Received')
        }
      }
    })

    return (next) => (action) => {
      switch (action.type) {
        case 'message:add': {
          socket.emit(action.type, action.payload)
          break
        }
        default: {
          return next(action)
        }
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
