import React from "react";

class FriendStatusClass extends React.Component {
   constructor(props) {
      super(props);
      this.state = { isOnline: null };
      this.handleStatusChange = this.handleStatusChange.bind(this);
   }

   /**
    FriendStatus component that displays whether a friend is online or not. 
    Our class reads friend.id from this.props, subscribes to the friend status after the component mounts, 
    and unsubscribes during unmounting 

    without componentDidUpdate 
    if the friend prop changes while the component is on the screen, Our component would continue displaying the online status of a different friend. 
    This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call would use the wrong friend ID.
    In a class component, we would need to add componentDidUpdate to handle this case:
    */
   componentDidMount() {
      ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
   }

   componentDidUpdate(prevProps) {
      // Unsubscribe from the previous friend.id
      ChatAPI.unsubscribeFromFriendStatus(prevProps.friend.id, this.handleStatusChange);
      // Subscribe to the next friend.id
      ChatAPI.subscribeToFriendStatus(this.props.friend.id, this.handleStatusChange);
   }

   componentWillUnmount() {
      ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id, this.handleStatusChange);
   }

   handleStatusChange(status) {
      this.setState({
         isOnline: status.isOnline,
      });
   }

   render() {
      if (this.state.isOnline === null) {
         return "Loading...";
      }
      return this.state.isOnline ? "Online" : "Offline";
   }
}
export default FriendStatusClass;
