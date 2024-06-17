import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import ProfilePage from './pages/account/Profile';
import AboutPage from './pages/account/About';
import ProfileFriendsPage from './pages/account/Friends';
import PhotosPage from './pages/account/Photos';
import SearchAllPage from './pages/search/SearchAll';
import SearchUsersPage from './pages/search/SearchUsers';
import SearchPostsPage from './pages/search/SearchPosts';
import Notification from './pages/notification/Notifications';
import SurroundingUsers from './pages/surroundingUsers/SurroundingUsers';

import EmailVerify from './pages/auth/EmailVerify';
import Login from './pages/auth/Login';
import NotFoundPage from './pages/auth/NotFoundPage';
import Register from './pages/auth/Register';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from './pages/auth/ForgotPass';
import PasswordReset from './pages/auth/PasswordReset';
import Message from './pages/Message';
import Event from './pages/Event';
import CreateNews from './pages/CreateNews';
import ManageEvent from './components/event/ManageEvent';
import DetailEvent from './components/event/DetailEvent';
import FriendsPage from './pages/friends/Friends';
import FriendsRequestsPage from './pages/friends/FriendsRequests';
import FriendsSuggest from './pages/friends/FriendsSuggest';
import HomeAdmin from './components/Admin/HomeAdmin';
import ManageUser from './components/Admin/ManageUser';
import ManageEventAd from './components/Admin/ManageEventAd';
import NotificationAdmin from './components/Admin/NotificationAdmin';
import ManagePost from './components/Admin/ManagePost';
function App() {
    return (
        <div>
            <ToastContainer
                className={'z-[999]'}
                position="top-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Routes>
                {/* Admin Page */}
                <Route
                    path="/v1/admin/"
                    element={<HomeAdmin />}
                />
                <Route
                    path="/v1/admin/manage-users"
                    element={<ManageUser />}
                />
                <Route
                    path="/v1/admin/manage-events"
                    element={<ManageEventAd />}
                />
                <Route
                    path="/v1/admin/notification"
                    element={<NotificationAdmin />}
                />
                <Route
                    path="/v1/admin/manage-post"
                    element={<ManagePost />}
                />

                {/* End Admin Page */}
                <Route
                    path="/postnews"
                    element={<CreateNews />}
                />
                <Route
                    path="/events"
                    exact
                    element={<Event />}
                />
                <Route
                    path="/events/detail-event/:id"
                    element={<DetailEvent />}
                />
                <Route
                    path="/message"
                    exact
                    element={<Message />}
                />
                <Route
                    path="/message/:id"
                    exact
                    element={<Message />}
                />
                <Route
                    path="/login"
                    exact
                    element={<Login />}
                />
                <Route
                    path="/register"
                    exact
                    element={<Register />}
                />
                <Route
                    path="users/:id/verify/:token"
                    element={<EmailVerify />}
                />
                <Route
                    path="/forgotpassword"
                    element={<ForgotPass />}
                />
                <Route
                    path="users/:id/forgotpass/:token"
                    element={<PasswordReset />}
                />
                <Route
                    path="/events/manage-events"
                    element={<ManageEvent />}
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/friends"
                    element={<FriendsPage />}
                />
                <Route
                    path="/friends/requests"
                    element={<FriendsRequestsPage />}
                />
                <Route
                    path="/friends/suggest"
                    element={<FriendsSuggest />}
                />

                <Route
                    path="/user/:id"
                    element={<ProfilePage />}
                />
                <Route
                    path="/user/:id/about"
                    element={<AboutPage />}
                />
                <Route
                    path="/user/:id/friends"
                    element={<ProfileFriendsPage />}
                />
                <Route
                    path="/user/:id/photos"
                    element={<PhotosPage />}
                />

                <Route
                    path="/search/all"
                    element={<SearchAllPage />}
                />
                <Route
                    path="/search/posts"
                    element={<SearchPostsPage />}
                />
                <Route
                    path="/search/users"
                    element={<SearchUsersPage />}
                />

                <Route
                    path="/surrounding-users"
                    element={<SurroundingUsers />}
                />
                <Route
                    path="/notifications"
                    element={<Notification />}
                />
            </Routes>
        </div>
    );
}

export default App;
