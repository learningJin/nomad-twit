import { useEffect, useState } from 'react';

import { authService } from 'fBase';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false); // Is this component initialized?
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      {init ? (
        <AppRouter userObj={userObj} refreshUser={refreshUser} />
      ) : (
        'initializing'
      )}
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
