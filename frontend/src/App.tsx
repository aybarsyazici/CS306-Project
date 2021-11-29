
import { Api } from './environment';
import { useState, useEffect } from 'react';
import { User } from './types/user';

function App() {

  const [userArray, setUserArray] = useState<User[]>([]);

  useEffect(() => {
    Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)});

    console.log(userArray);
  }, [])

  return (
    <div className="App">
      {userArray?.map((user) => <p>{user.username}</p>)}
    </div>
  );
}

export default App;
