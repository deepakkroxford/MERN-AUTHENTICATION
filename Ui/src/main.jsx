import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter
    future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
  >
    <AppContextProvider>
      <App/>
  </AppContextProvider>
   
  </BrowserRouter>
);
