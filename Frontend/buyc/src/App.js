import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoutes/>
      <Toaster/>
    </div>
  );
}

export default App;
