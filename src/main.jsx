import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
