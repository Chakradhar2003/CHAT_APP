import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage"
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <Routes>


        <Route path='/' element={<HomePage />} />

        <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
