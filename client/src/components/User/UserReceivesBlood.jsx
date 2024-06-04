import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { LuUserMinus } from 'react-icons/lu';
import { MdLocationPin, MdBloodtype } from 'react-icons/md';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';

const UserReceivesBlood = () => {
    return (
        <div className="flex justify-between p-2 rounded-lg bg-white mb-2">
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                appendTo={document.body}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview />
                    </div>
                )}
            >
                <Link className="flex cursor-pointer items-center" to={'/user/123'}>
                    <Avatar
                        className={'rounded-[50%] w-[60px] h-[60px] border border-[#ccc] '}
                        src={
                            'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/441250620_3695527330704314_8490629817759178725_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IoE8VKYhWu8Q7kNvgGxAHuu&_nc_ht=scontent.fhan2-3.fna&oh=00_AYDZkvtqpf6yimjlPmt9HtGcHvGQ7a6HpFzu8DrfY2XFzA&oe=66561290'
                        }
                        alt={'avatar'}
                    />
                    <div className="ml-3 flex flex-col justify-center">
                        <h4 className="text-[15px] font-semibold">Tran Tuan Anh</h4>
                        <div className="text-[12px] text-[#65676B] flex items-center">
                            <MdBloodtype />
                            <span className="ml-1">A-</span>
                        </div>
                        <div className="text-[12px] text-[#65676B] flex items-center">
                            <LuUserMinus />
                            <span className="ml-1">Người nhận máu</span>
                        </div>
                    </div>
                </Link>
            </Tippy>
            <div className="flex-center">
                <div className=" px-2 py-0.5 text-[14px] text-[#65676B] flex items-center">
                    <MdLocationPin />
                    <span className="ml-1">Hai Bà Trưng, Hà Nội</span>
                </div>
            </div>
        </div>
    );
};

export default UserReceivesBlood;
