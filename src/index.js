import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



import { ChakraProvider } from "@chakra-ui/react"

import { Provider } from 'react-redux'

import store from './store/user-slice';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <ChakraProvider>
        {/* <ColorModeScript initialColorMode="dark"> */}
        <App />
        {/* </ColorModeScript> */}
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

