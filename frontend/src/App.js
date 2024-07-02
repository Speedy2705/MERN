import logo from './logo.svg';
import './App.css';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import footer from './components/Footer';

function App() {
    return(
        <>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Outlet/>
        <Footer/>
        </>
    );
}

export default App;
