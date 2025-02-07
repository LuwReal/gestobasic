import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './componetes/Home';
import BasicGesto from './componetes/BasicGesto';

// import BasicGesto from './componetes/BasicGesto';



// import Home from './componetes/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path='/' element={<Home />}/>
          <Route path='/BasicGesto' element={<BasicGesto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

