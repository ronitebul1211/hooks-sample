import React from "react";

import React, { useState, useEffect } from "react";

function FriendStatusFunction(props) {
   const [isOnline, setIsOnline] = useState(null);

   useEffect(() => {
      function handleStatusChange(status) {
         setIsOnline(status.isOnline);
      }
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      // Specify how to clean up after this effect:
      return function cleanup() {
         ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
   });

   //rendering
   if (isOnline === null) {
      return "Loading...";
   }
   return isOnline ? "Online" : "Offline";
}

export default FriendStatusFunction;
