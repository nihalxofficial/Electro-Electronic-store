import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const ProfilePage = async() => {
    const user = await getUserSession();
    const profileId = user?.id;
    redirect(`/profile/${profileId}`);
};

export default ProfilePage;