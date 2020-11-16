import React, { useState, useEffect } from "react";

function CounterFunction() {
   const [count, setCount] = useState(0);

   console.log("function executed");
   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
      // Update the document title using the browser API
      document.title = `You clicked ${count} times`;
      console.log("use effect called");
   });

   return (
      <div>
         {console.log("render")}
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
   );
}

export default CounterFunction;
