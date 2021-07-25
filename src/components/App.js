import {useState} from 'react';

import firebase from '../firebase';
import AppRouter from './Router';

function App() {
  console.log(firebase);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
