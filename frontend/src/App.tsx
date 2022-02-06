import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'components/AuthProvider';
import AppRoutesManager from 'components/AppRoutesManager/AppRoutesManager';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutesManager />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
