import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Avatar from '../Image/Avatar';
import UserPreview from './UserPreview';

/*
-- Props data
    {
        image : "http://....",
        full_name : "Hung Phi"
    }
*/
const UserFriendProfile = ({ className, data }) => {
    return (
        <Link className={className}>
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md shadow-black w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview data={null} />
                    </div>
                )}
            >
                <div>
                    <Avatar
                        className="object-cover w-full h-full aspect-square rounded-[8px]"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="avatar"
                    />
                    <div>
                        <span className="text-[12px] font-semibold">Hung Phi</span>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
};

export default UserFriendProfile;
