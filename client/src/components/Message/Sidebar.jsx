import React from 'react';
import SidebarHeader from './Sidebar/SidebarHeader';
import Searchbox from './Sidebar/Searchbox';
import Contacts from './Sidebar/Contacts';

const Sidebar = () => {
    return (
        <section className="flex flex-col h-screen flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out hover:w-64 ssm:hover:w-[40%]">
            <SidebarHeader />
            <Searchbox />
            <Contacts />
        </section>
    );
};

export default Sidebar;
