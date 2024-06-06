import Image from './Image/Image';
import noFriend from '../assets/images/friends.svg';

const NoFriends = () => {
    return (
        <div className="flex-center h-screen">
            <div className="flex flex-col items-center">
                <Image className={'bg-transparent w-[220px]'} src={noFriend} alt={'No result'} />
                <h3 className="text-[18px] font-semibold">Không có bạn bè nào hiển thị</h3>
                <span className="text-[#65676B] text-[15px]">
                    Bạn bè trên BloodDonation của bạn sẽ xuất hiện tại đây
                </span>
            </div>
        </div>
    );
};

export default NoFriends;
