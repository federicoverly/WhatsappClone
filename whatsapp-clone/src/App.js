import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from './axios.js';
import { selectUser, login, logOut } from './features/userSlice.js';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const [ messages, setMessages ] = useState([])

  useEffect ( () => {
    auth.onAuthStateChanged ((authUser) => {
      if (authUser) {
        // User is logged in
        dispatch(
          login({
          uId: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // User is logged out
        dispatch(logOut());
      }
    })
  }, [dispatch])

  useEffect( () => {
    axios.get('/api/v1/messages/sync').then(response => {
      setMessages(response.data)
    })

  }, [])
  useEffect(() => {
    var pusher = new Pusher('555e38757b4aab7797aa', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages])

  return (
    <div className="app">
      
    <div className="app__body">

        {user ? (
        <>
        <Sidebar />
        <Chat messages={messages}/>
        </>
        ) : (<Login />)}
     </div>

    </div>
  );
}

export default App;
