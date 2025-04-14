import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();
    
    const [countdown, setCountdown] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        let timer;
        if (isCounting && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, isCounting]);

    const onSubmit = async (data) => {
        if (isCounting) {
            toast.error(`Please wait ${countdown} seconds before submitting`);
            return;
        }

        setCountdown(2);
        setIsCounting(true);
            await new Promise(resolve => setTimeout(resolve, 2000));            

        try {
            const response = await axios.post("http://localhost:3000/user/login", data);
            if (response.data) {
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                toast.success("Login successful!");
                setTimeout(() => {
                    window.location.reload();
                  }, 2000);

                
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                toast.error(err.response.data.message || 'Login failed');
            } else {
                toast.error('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center">
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box dark:bg-[#272626] dark:text-white rounded-lg shadow-lg p-6">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-4">Welcome to LibriVault</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div> 

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                                {...register("password", { 
                                    required: "Password is required", 
                                    minLength: { 
                                        value: 6, 
                                        message: "Password must be at least 6 characters" 
                                    } 
                                })}
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button 
                                type="submit"
                                disabled={isSubmitting || isCounting}
                                className={`dark:bg-white dark:hover:bg-gray-300 dark:text-black bg-black text-white px-5 py-2 rounded-lg transition duration-300 w-full flex justify-center items-center gap-2 ${
                                    (isSubmitting || isCounting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging....
                                    </>
                                ) : isCounting ? (
                                    `Please wait ${countdown}s...`
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm">
                                Not registered?
                                <Link to={"/SignUp"} className="ml-1 text-blue-500 cursor-pointer hover:underline">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;