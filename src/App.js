import { useCustomState as useState } from './polyfills/useCustomState';

function App() {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState('Hello');

  return (
    <div className="App">
      {state1}
      <button onClick={() => setState1((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setState1((prev) => prev - 1)}>Decrement</button>
      <button onClick={() => setState1(0)}>Reset</button>
      <br />
      {state2}
      <button onClick={() => setState2((prev) => prev + '!')}>Add exclamation mark</button>
    </div>
  );
}

export default App;
