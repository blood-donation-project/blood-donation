import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import ProfilePage from './pages/account/Profile';
import AboutPage from './pages/account/About';
import FriendsPage from './pages/account/Friends';
import PhotosPage from './pages/account/Photos';
import SearchAllPage from './pages/search/SearchAll';
import SearchUsersPage from './pages/search/SearchUsers';
import SearchPostsPage from './pages/search/SearchPosts';
import Notification from './pages/notification/Notifications';
import SurroundingUsers from './pages/surroundingUsers/SurroundingUsers';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/user/:id" element={<ProfilePage />} />
                <Route path="/user/:id/about" element={<AboutPage />} />
                <Route path="/user/:id/friends" element={<FriendsPage />} />
                <Route path="/user/:id/photos" element={<PhotosPage />} />

                <Route path="/search/all" element={<SearchAllPage />} />
                <Route path="/search/posts" element={<SearchPostsPage />} />
                <Route path="/search/users" element={<SearchUsersPage />} />

                <Route path="/surrounding-users" element={<SurroundingUsers />} />
                <Route path="/notifications" element={<Notification />} />
            </Routes>
        </Router>
    );
}

export default App;
