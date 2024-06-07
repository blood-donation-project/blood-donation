import EmailVerify from './pages/auth/EmailVerify';
import Login from './pages/auth/Login';
import NotFoundPage from './pages/auth/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from './pages/auth/ForgotPass';
import PasswordReset from './pages/auth/PasswordReset';
import Message from './pages/Message';
import Event from './pages/Event';
import CreateNews from './pages/CreateNews';
import ManageEvent from './components/event/ManageEvent';
import DetailEvent from './components/event/DetailEvent';
function App() {
    return (
        <div>
            <ToastContainer
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
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/message"
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
            </Routes>
        </div>
    );
}

export default App;
