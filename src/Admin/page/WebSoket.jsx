<<<<<<< HEAD
import { Client } from '@stomp/stompjs';
import { getToken } from '../../components/Authentication/authService';
const token = getToken();
const stompClient = new Client({

    brokerURL: 'http://localhost:8080/chat',
    reconnectDelay: 5000,
    onConnect: () => {
        console.log("WebSocket connected!");
    },
    onDisconnect: () => {
        console.log("WebSocket disconnected!");
    }
});
=======
// import { Client } from '@stomp/stompjs';

// const stompClient = new Client({
//     brokerURL: 'http://localhost:8080/chat',  
//     reconnectDelay: 5000, 
//     onConnect: () => {
//         console.log("WebSocket connected!");
//     },
//     onDisconnect: () => {
//         console.log("WebSocket disconnected!");
//     }
// });
>>>>>>> bb2c290bf1c1c3a971ecb5918e57f5efc680ad2a

// export { stompClient };
