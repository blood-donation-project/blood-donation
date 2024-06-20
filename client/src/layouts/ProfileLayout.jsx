import NavMenu from '../components/NavMenu';
import ProfileOverview from '../components/Profile/ProfileOverview';

const ProfileLayout = ({ children }) => {
    return (
        <>
            <NavMenu />
            <div className="mt-[56px]  ">
                <div className="  max-w-[1150px] mx-auto px-4  ">
                    {/* Profice cover */}
                    <ProfileOverview />
                </div>

                <div className="w-full">{children}</div>
            </div>
        </>
    );
};

export default ProfileLayout;
