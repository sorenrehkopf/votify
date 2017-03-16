import io from "socket.io-client"
var socket = io('localhost:3000/socketspace')
export default socket
