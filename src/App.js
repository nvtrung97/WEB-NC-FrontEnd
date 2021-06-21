import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router';
import { AuthProvider } from './contexts/auth.context';
import { CategoryProvider } from './contexts/category-context';
import DetailCoursePage from './pages/DetailCoursePage';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Header />

        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/course/:courseId">
          <DetailCoursePage />
        </Route>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
