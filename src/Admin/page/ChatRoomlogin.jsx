import React, { useState } from 'react';
import ChatRoom from './ChatRoom';

function ChatRoomlogin() {
    const [userId, setUserId] = useState('');

  return (
    <div>
      {!userId ? (
        <div>
          <h2>Enter your User ID:</h2>
          <input type="text" onChange={(e) => setUserId(e.target.value)} />
        </div>
      ) : (
        <ChatRoom userId={userId} />
      )}
    </div>
  );
}

export default ChatRoomlogin;