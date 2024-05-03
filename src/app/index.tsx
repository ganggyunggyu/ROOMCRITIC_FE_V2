import Footer from '../entities/Footer';
import Header from '../entities/Header';
import DarkModeButton from '../entities/atom-component/DarkModeButton';
import Routing from '../pages';
import useDarkMode from '../shared/hooks/common/useDarkMode';
import { cn } from '../shared/util/cn';
import './styles/App.css';

function App() {
  const { isDarkMode, darkModeClasses, toggleDarkMode } = useDarkMode();

  return (
    <main className={cn(`${darkModeClasses} transition-all`)}>
      <Header />
      <Routing />
      <Footer />
      <DarkModeButton darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </main>
  );
}

export default App;
