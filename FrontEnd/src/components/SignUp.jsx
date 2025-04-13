import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";

function SignUp() {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const userinfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };

        try {
            const response = await axios.post("http://localhost:3000/user/SignUp", userinfo);
            if (response.data) {
                setMessage("Signup successful");
                setMessageType("success");
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                setMessage(err.response.data.message || 'Signup failed');
                setMessageType("error");
            } else {
                setMessage('Network error. Please try again.');
                setMessageType("error");
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
                                minLength: {
                                    value: 3,
                                    message: "Full name must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 40,
                                    message: "Full name cannot exceed 40 characters"
                                },
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
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password must be within 20 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {message && (
                        <div className={`text-sm font-medium mb-2 ${messageType === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                            {message}
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="dark:bg-white dark:hover:bg-gray-300 dark:text-black bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300 w-full">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
