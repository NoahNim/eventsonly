import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import Home from './components/Homepage'
import EventsManager from './components/Events';
import CreateEvent from './components/Events/NewEvent';
import Event from './components/Events/Event';
import EditEvent from './components/Events/editEvent';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <button onClick={() => setShowModal(true)}>Modal</button> */}
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path='/signup' exact>
            <SignupFormPage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/events" exact>
            <EventsManager />
          </Route>
          <Route path="/events/new" exact>
            <CreateEvent />
          </Route>
          <Route path="/events/:id" exact>
            <Event />
          </Route>
          <Route path="/events/:id/edit" exact>
            <EditEvent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
