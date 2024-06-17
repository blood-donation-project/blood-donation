import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchUser = (endpoint) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/user${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchUser();
    }, [endpoint]);
    return user;
};
