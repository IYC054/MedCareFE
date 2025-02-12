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

export { stompClient };
