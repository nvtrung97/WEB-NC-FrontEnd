import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { AuthProvider } from './contexts/auth.context';
import { CategoryProvider } from './contexts/category-context';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Header />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
