import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Avatar from '../Image/Avatar';
import UserPreview from './UserPreview';

const UserFriendProfile = ({ className, friendData }) => {
    return (
        <Link className={className} to={`/user/${friendData._id}`}>
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                appendTo={document.body}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md z-[99] shadow-black w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview userData={friendData} />
                    </div>
                )}
            >
                <div>
                    <Avatar
                        className="object-cover w-full h-full aspect-square rounded-[8px]"
                        src={friendData.avatar}
                        alt="avatar"
                    />
                    <div>
                        <span className="text-[12px] font-semibold">{friendData.username}</span>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
};

export default UserFriendProfile;
