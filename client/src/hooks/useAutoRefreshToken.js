// Trong thư mục hooks, tạo một file mới, ví dụ useAutoRefreshToken.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRefreshtokenMutation } from '../Redux/features/auth/authAPI';

export const useAutoRefreshToken = (endpoint) => {
    const [refreshToken] = useRefreshtokenMutation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (!accessToken) {
            toast.error('Vui lòng đăng nhập để tiếp tục');
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
                        await refreshToken().unwrap();
                    } else {
                        const data = await response.text();
                    }
                } catch (error) {
                    console.error('Error:', error);
                    navigate('/login');
                }
            };

            fetchData();
        }
    }, [accessToken, navigate, endpoint, refreshToken]);
};

export const useVerifyToken = (endpoint) => {
    const [refreshToken] = useRefreshtokenMutation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (!accessToken) {
            toast.error('Vui lòng đăng nhập để tiếp tục');
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3001${endpoint}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.status === 403) {
                        navigate(-1);
                    } else {
                        // Handle successful response if needed
                        await response.text();
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchData();
        }
    }, [accessToken, navigate, endpoint, refreshToken]);
};
