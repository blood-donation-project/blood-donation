import Tippy from '@tippyjs/react/headless';
import UserPreview from '../User/UserPreview';
import { Link } from 'react-router-dom';
import Avatar from '../Image/Avatar';

import calculatePostTime from '../../utils/formartTime/calculatePostTime';

// Data truyền vào : Thông tin user comment, nội dung comment , thời gian của comment đã đăng được bao lâu
const PostComment = ({ commentData }) => {
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
                                <UserPreview userData={commentData.user} />
                            </div>
                        )}
                    >
                        <Link to={'/'}>
                            <Avatar
                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                src={commentData.user.avatar}
                                alt="avatar"
                            />
                        </Link>
                    </Tippy>
                </div>
                <div className="ml-2 ">
                    <div className="bg-[#f0f2f5] rounded-[10px]  p-2 ">
                        <p className="text-[12px] font-semibold leading-[14px]">{commentData.user.username}</p>
                        <p className="text-[14px]">{commentData.content}</p>
                    </div>
                    <div className="px-2">
                        <span className="text-[10px] text-[#65676B] leading-[10px]">
                            {calculatePostTime(commentData.createAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostComment;
