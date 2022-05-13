import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from "./redux/configureStore";
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  render() {

    const store = ConfigureStore();

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
