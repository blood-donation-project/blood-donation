import React, { useEffect } from 'react';
import { useAutoRefreshToken } from '../hooks/useAutoRefreshToken';
import NavMenu from '../components/NavMenu';
import { useGetUserMutation } from '../Redux/features/user/userAPI';
const Home = () => {
    useAutoRefreshToken('/home/');
    const [getUser, { data: userData }] = useGetUserMutation();
    //  GET USER HERE!
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUser().unwrap();
            } catch (error) {}
        };
        fetchUser();
    }, [getUser]);
    return (
        <>
            <div>
                <NavMenu userData={userData} />
            </div>
        </>
    );
};

export default Home;
