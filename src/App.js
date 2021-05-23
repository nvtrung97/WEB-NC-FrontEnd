import { AuthProvider } from "./contexts/auth.context";
import Routes from './components/index';

function App() {
  
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    )
}

export default App;
