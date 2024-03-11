import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chatbot from "./components/chatbot/Chatbot";
import Qna from "./components/chatbot/Qna";
import Main from "./components/Main";
import Shop from "./components/shop/Shop";
import Footer from "./components/layout/Footer";

function App() {
  return (
      <div>
          <div className={'container'}>
              <BrowserRouter>
                  <Routes>
                      <Route path={'/'} element={<Main/>}/>

                      <Route path={'/chatbot'} element={<Chatbot/>}/>
                      <Route path={'/shopping'} element={<Shop/>}/>
                      <Route path={'/qna'} element={<Qna/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
          {!['/chatbot', '/qna'].includes(window.location.pathname) && (
              <div style={{ height: '100px' }} className={'mobilehide'} />
          )}
          {!['/chatbot', '/qna'].includes(window.location.pathname) && <Footer />}
      </div>

  );
}

export default App;
