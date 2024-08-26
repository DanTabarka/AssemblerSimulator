import './App.css';
import Code from './Code/Code.js'
import Registers from './Registers/Registers.js'
import Stack from './Stack/Stack.js'
import Buttons from './Buttons/Buttons.js'

function App() {
  return (
    <div className="App">
      <Buttons />
      <div className="flex">
        <Code />
        <Registers />
        <Stack />
      </div>
    </div>
  );
}

export default App;
