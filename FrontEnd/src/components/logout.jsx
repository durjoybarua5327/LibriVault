import React from 'react';
import { useAuth } from '../Context/Authprovider';
import toast from 'react-hot-toast';

function Logout() {
    const [userAuth, setUserAuth] = useAuth();

    const handleLogout = () => {
        try {
            setUserAuth({
                ...userAuth,
                user:null
            });
            localStorage.removeItem("Users");
            toast.success("Logout successfully!")
            setTimeout(() => {
                window.location.reload();
              }, 2000);
        } catch (error) {
            toast.error("Logout failed:", error.message);
        }
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                className='px-3 py-1.5 border border-red-400 text-white bg-red-400 rounded-md dark:text-black cursor-pointer hover:bg-red-500 transition-all'
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
