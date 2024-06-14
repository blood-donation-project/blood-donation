import React from 'react';
import Menu from '../components/Admin/Menu';
import HomeAdmin from '../components/Admin/HomeAdmin';

const AdminPage = () => {
    return (
        <div className="h-screen flex">
            <Menu />
            <HomeAdmin />
        </div>
    );
};

export default AdminPage;
