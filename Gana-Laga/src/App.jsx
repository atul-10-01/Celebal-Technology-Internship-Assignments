import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App h-screen bg-black">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/library" element={<div className="text-white">Library Page - Coming Soon</div>} />
              <Route path="/create-playlist" element={<div className="text-white">Create Playlist - Coming Soon</div>} />
              <Route path="/liked-songs" element={<div className="text-white">Liked Songs - Coming Soon</div>} />
              <Route path="/downloaded" element={<div className="text-white">Downloaded - Coming Soon</div>} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  )
}

export default App
