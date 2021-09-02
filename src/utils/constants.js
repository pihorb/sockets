const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  DISCONNECTED: 'disconnected',
  ALL_USERS: 'all_users',
  NEW_USER_CONNECTED: 'new_user_connected',
}

const ERROR_MESSAGES = {
  INVALID_USERNAME: 'invalid_username',
  USERNAME_TAKEN: 'username_taken',
  CONNECT_ERROR: 'connect_error',
}

module.exports = { SOCKET_EVENTS, ERROR_MESSAGES }
