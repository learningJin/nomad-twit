import {useState} from 'react';

import { authService } from 'fBase';
import AppRouter from 'components/Router';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
