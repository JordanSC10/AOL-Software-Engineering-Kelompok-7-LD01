import { io } from "socket.io-client";

// Arahin ke URL Backend lo
const socket = io("http://localhost:5000", {
  autoConnect: false // Kita konekin pas user udah login aja
});

export default socket;