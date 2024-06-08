import Tippy from '@tippyjs/react/headless';
import UserPreview from '../User/UserPreview';
import { Link } from 'react-router-dom';

// Data truyền vào : Thông tin user comment, nội dung comment , thời gian của comment đã đăng được bao lâu
const PostComment = () => {
    return (
        <div className="pb-2">
            <div className="flex">
                <div>
                    <Tippy
                        interactive={true}
                        placement="top-start"
                        delay={[400, 0]}
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
                        <Link to={'/'}>
                            <img
                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/441185472_859553369550576_4197182993968662181_n.png?stp=dst-png_p120x120&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4FR8PvJr70sQ7kNvgH0CKF-&_nc_ht=scontent.fhan20-1.fna&oh=00_AYC5XrkeyvJ_TzA89BxoTt2ENAlVvOu0ufQ7WRq8Uu9t_w&oe=664A21C6"
                                alt="avatar"
                            />
                        </Link>
                    </Tippy>
                </div>
                <div className="ml-2 ">
                    <div className="bg-[#f0f2f5] rounded-[10px]  p-2 ">
                        <p className="text-[12px] font-semibold leading-[14px]">TOP Comments</p>
                        <p className="text-[14px]">Chán *** buồn nói! </p>
                    </div>
                    <div className="px-2">
                        <span className="text-[10px] text-[#65676B] leading-[10px]">17 phút</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostComment;
