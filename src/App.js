import React from 'react';

import { useState } from './polyfills/useState';
import { useEffect } from "./polyfills/useEffect";
import Toast, { useToast } from './components/Toast';
import Popover, { PLACEMENTS } from "./components/Popover";

function App() {
  const toast = useToast();
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState('Hello');
  const [state3, setState3] = useState();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const ref = React.useRef();
  useEffect(() => {
    console.log('useEffect called when state1 changes ', state1);
  }, [state1]);
  useEffect(() => {
    setState3('from useEffect');
  }, []);
  return (
    <div className="App">
      {state1}
      <button onClick={() => {
        setState1((prev) => prev + 1);
        toast.show('Incremented', 1000);
      }}>Increment</button>
      <button onClick={() => {
        setState1((prev) => prev - 1);
        toast.show('Decremented', 100000);
      }}>Decrement</button>
      <button onClick={() => {
        setState1(0);
      }}>Reset</button>
      <br />
      <button onClick={() => {
        toast.show('On demand toast', 5000);
      }}>Show Toast</button>
      <br />
      {state2}
      <button onClick={() => setState2((prev) => prev + '!')}>Add exclamation mark</button>
      <br />
      {state3}
      <Toast />
      <div className="center">
        <button onClick={() => setPopoverVisible(prev => !prev)} ref={ref}>Show Popover</button>
      </div>
      <br />
      <Popover
        visible={popoverVisible}
        onClose={() => setPopoverVisible(false)}
        placement={PLACEMENTS.LEFT}
        ref={ref}
      >
        Popover content
      </Popover>
    </div>
  );
}

export default App;
