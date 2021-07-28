import {useEffect, useState} from 'react';

import { authService } from 'fBase';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false); // Is this component initialized?
  const [userObj, setUserObj] = useState(null);

  useEffect( () => {
    authService.onAuthStateChanged( user => {
      if(user){
        setUserObj(user);
      }
      setInit(true)
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'initializing'}
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
