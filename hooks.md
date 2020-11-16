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

useEffect, adds the ability to perform side effects.
side effects, operations can affect other components and can’t be done during rendering.  
like data fetching, setting up a subscription, Network requests, or manually changing the DOM from React components.
It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.
React run “effect” function after flushing changes to the DOM. **By default, after every render — including the first**.
<br/><br/>

### What does useEffect do?

By using this Hook, you tell React that your component needs to do something after render.
React will remember the function you passed (effect), and call it later after performing the DOM updates.
<br/><br/>

### Effects Without Cleanup

Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup.
<br/><br/>

### Effects with Cleanup

For example, we might want to set up a subscription to some external data source.  
In that case, it is important to clean up so that we don’t introduce a memory leak!  
how? by returning function from useEffect - optional cleanup mechanism for effects.
This lets us keep the logic for adding and removing subscriptions close to each other.  
This is why React also cleans up effects from the previous render before running the effects next time.
<br/><br/>

### Timeline

1. setStateFun()
2. useEffect cleanup function execute (if exist)
3. functional component execute
4. component re-rendering with updated state
5. use effect execute
6. reference to clean up saved
   <br/><br/>

### Does useEffect run after every render?

Yes! **By default**, it runs both after the first render and after every update.
When React renders our component, it will remember the effect we used, and run it after updating the DOM.
This happens for every render, including the first one.
<br/>
Experienced developers might notice that the function passed to useEffect is going to be different on every render.
In fact, this is what lets us read the count value from inside the effect without worrying about it getting stale.
Every time we re-render, we schedule a different effect, replacing the previous one.
In a way, this makes the effects behave more like a part of the **render result — each effect “belongs” to a particular render**.
<br/><br/>

### Why Effects Run on Each Update

If you’re used to classes, you might be wondering why the effect cleanup phase happens after every re-render, and not just once during unmounting.  
There is no special code for handling updates because useEffect handles them by default.
It cleans up the previous effects before applying the next effects.
<br/><br/>

### Optimizing Performance by Skipping Effects

cleaning up +/ applying the effect after every render might create a performance problem.
In class components, it solved by writing an extra comparison with prevProps or prevState inside componentDidUpdate.
This requirement is common enough that it is built into the useEffect Hook API.
**to tell React to skip applying an effect if certain values haven’t changed between re-renders,**
**pass an array as an optional second argument to useEffect with values you want to "watch"**  
If there are multiple items in the array, React will re-run the effect even if just one of them is different.
<br/>

If you use this optimization, make sure the array includes all values from the component scope,
such as props and state that change over time and that are used by the effect.  
Otherwise, your code will reference stale values from previous renders.
<br/>

If you want to run **an effect and clean it up only once (componentDidMount and componentWillUnmount mental model)**,  
you can pass an empty array ([]) as a second argument.  
This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
<br/><br/>

### Demonstration

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

count passed inside array as the second argument.  
what does this mean? If the count is 5, and then our component re-renders with count still equal to 5,
React will compare [5] from the previous render and [5] from the next render.  
Because all items in the array are the same (5 === 5),
React would skip the effect (optimization).
<br/>

When we render with count updated to 6,
React will compare the items in the [5] array from the previous render to items in the [6] array from the next render.
This time, React will re-apply the effect because 5 !== 6.
