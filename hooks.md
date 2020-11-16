# Hooks

Hooks are JavaScript functions, but they impose two additional rules:

-  **Only call Hooks at the top level.** Don’t call Hooks inside loops, conditions, or nested functions.
-  **Only call Hooks from React function components.** Don’t call Hooks from regular JavaScript functions.  
   There is just one other valid place to call Hooks — your own custom Hooks.
   ( linter plugin to enforce these rules automatically)

## State Hook

We call it inside a function component to add some local state to it.  
Normally, variables disappear when the function exits but state variables are preserved by React between re-renders.
State variables can hold objects and arrays just fine, so you can still group related data together.
It’s similar to this.setState in a class, except it doesn’t merge the old and new state together,  
updating a state variable always replaces it instead of merging it.

-  import the useState Hook from React.
-  calling useState, declares a state variable ()
-  The only argument to useState is the initial state.
-  It returns a pair of values: the current state and a function that updates it.
   -  When we want to display the current state, we refer it directly
   -  to update state use set function

## Effect Hook

The Effect Hook, useEffect, adds the ability to perform side effects from a function component.  
side effects, operations can affect other components and can’t be done during rendering.  
like data fetching, subscriptions, or manually changing the DOM from React components.
It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.
React run “effect” function after flushing changes to the DOM. By default, after every render — including the first.

-  Effects may also optionally specify how to “clean up” after them by returning a function.
