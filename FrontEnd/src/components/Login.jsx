import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isError: false,
        isSuccess: false
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/user/login", data);
            if (response.data) {
                setSubmitStatus({
                    message: "Login successful!",
                    isError: false,
                    isSuccess: true
                });
                
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                setSubmitStatus({
                    message: err.response.data.message || 'Login failed',
                    isError: true,
                    isSuccess: false
                });
            } else {
                setSubmitStatus({
                    message: 'Network error. Please try again.',
                    isError: true,
                    isSuccess: false
                });
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

                        {/* Status message display */}
                        {submitStatus.message && (
                            <div className={`p-3 rounded-lg ${submitStatus.isError ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <button 
                                type="submit"
                                className="dark:bg-white dark:hover:bg-gray-300 dark:text-black bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300 w-full">
                                Login
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