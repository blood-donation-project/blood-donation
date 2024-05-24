import React from 'react';
import useAutoRefreshToken from '../hooks/useAutoRefreshToken';
import NavMenu from '../components/NavMenu';
const Home = () => {
    //     if (!accessToken) {
    //         navigate('/login');
    //     }
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3001/home/', {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });
    //             if (response.status === 403) {
    //                 // Access Token expired
    //                 const newAccessToken = await dispatch(
    //                     refreshToken()
    //                 ).unwrap();
    //                 if (!newAccessToken) {
    //                     navigate('/login');
    //                 }
    //                 localStorage.setItem('accessToken', newAccessToken);
    //             } else {
    //                 const data = await response.text();
    //                 console.log('Protected Data:', data);
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchData();
    // }, [accessToken, dispatch, navigate]);

    useAutoRefreshToken('/home/');

    return (
        <>
            <div>
                <NavMenu />
            </div>
        </>
    );
};

export default Home;
