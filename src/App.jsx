import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilterPage from './pages/FilterPage';
import ResultPage from './pages/ResultPage';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilterPage />} />
        <Route path="/result/:makeId/:year" element={<ResultPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
