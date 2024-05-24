// Trong thư mục hooks, tạo một file mới, ví dụ useAutoRefreshToken.js
import { useEffect } from 'react';
import { refreshToken } from '../Redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAutoRefreshToken = (endpoint) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001${endpoint}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.status === 403) {
                        // Access Token expired
                        const newAccessToken = await dispatch(
                            refreshToken()
                        ).unwrap();
                        if (!newAccessToken) {
                            navigate('/login');
                        } else {
                            localStorage.setItem('accessToken', newAccessToken);
                        }
                    } else {
                        // Handle successful response if needed
                        const data = await response.text();
                        console.log('Protected Data:', data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchData();
        }
    }, [accessToken, dispatch, navigate, endpoint]);
};

export default useAutoRefreshToken;