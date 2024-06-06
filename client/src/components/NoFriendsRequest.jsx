import Image from './Image/Image';
import noFriend from '../assets/images/friends.svg';

const NoFriendsRequest = () => {
    return (
        <div className="flex-center h-screen">
            <div className="flex flex-col items-center">
                <Image className={'bg-transparent w-[220px]'} src={noFriend} alt={'No result'} />
                <h3 className="text-[18px] font-semibold">Lời mời kết bạn sẽ hiển thị tại đây</h3>
            </div>
        </div>
    );
};

export default NoFriendsRequest;
