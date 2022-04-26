import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const countContext = createContext();

function App() {

  const [count, setCount] = useState(0);  //setting initial value (using react hook - https://reactjs.org/docs/hooks-overview.html)

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
  <countContext.Provider value={{count, increment, decrement}}>
    <BrowserRouter>
      <div className="text-center">
        <nav>
          <Link to="/increment"><Button color="warning" className="m-3">Increment button</Button></Link>
          <Link to="/"><Button color="warning" className="m-3">Input + label</Button></Link>
          <Link to="/decrement"><Button color="warning" className="m-3">Decrement button</Button></Link>  
        </nav>

        <Routes>
          <Route path="/increment" element={<Increment/>} />
          <Route path="/" element={<Input/>} />
          <Route path="/decrement" element={<Decrement/>} />
        </Routes>
      </div>
    </BrowserRouter>
  </countContext.Provider>
  );
}

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleReset(event) {
    this.setState({value: ""});
    event.preventDefault();
  }

  render() { 
  return(
    <div>
      <input type="text" value={this.state.value} onChange={this.handleChange} className="w-25 text-center"></input><br />
      <Button onClick={this.handleReset} color="info" className="m-3">Reset</Button>
      <h1>{this.state.value}</h1>
    </div>
    );
  }
}


function Increment() {

  const {count, increment} = useContext(countContext);

  return(
    <div>
      <h1>{count}</h1>
      <Button onClick={increment} color="success">Increment</Button>
    </div>
  );
}


function Decrement() {

  const {count, decrement} = useContext(countContext);

  return(
    <div>
      <h1>{count}</h1>
      <Button onClick={decrement} color="danger">Decrement</Button>
    </div>
  );
}

export default App;
