import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";

function SignUp() {
    const navigate = useNavigate();
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

        setCountdown(4);
        setIsCounting(true);
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        const userinfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };

        try {
            const response = await axios.post("http://localhost:3000/user/SignUp", userinfo);
            if (response.data) {
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                toast.success("Signup successful");
                navigate(-1);
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                toast.error(err.response.data.message || 'Signup failed');
            } else {
                toast.error('Network error. Please try again.');
            }
        }
    };

    return (
        <div className='h-[100vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
            <div className="dark:bg-[#272626] bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className='flex justify-between'>
                    <h3 className="font-bold text-2xl text-center mb-4">Create Account</h3>
                    <Link to='/'>
                        <button className="btn btn-sm btn-circle btn-ghost text-xl">✕</button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register("fullname", {
                                required: "Full name is required",
                                minLength: { value: 3, message: "Full name must be at least 3 characters" },
                                maxLength: { value: 40, message: "Full name cannot exceed 40 characters" },
                                pattern: {
                                    value: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
                                    message: "Enter at least first and last name (letters only)"
                                }
                            })}
                        />
                        {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
                    </div>

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
                            placeholder="Create a password"
                            className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                maxLength: { value: 20, message: "Password must be within 20 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
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
                                    Submitting...
                                </>
                            ) : isCounting ? (
                                `Please wait ${countdown}s...`
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
