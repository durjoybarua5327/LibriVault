import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Login from './Login';

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Add your signup logic here
    };

    return (
        <div className=' h-[100vh] flex items-center justify-center'>
            <div className="dark:bg-[#272626] dark:text-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className='flex justify-between'>
                    <h3 className="font-bold text-2xl text-center mb-4">Create Account</h3>
                    <Link to='/'>
                    <button className="btn btn-sm btn-circle btn-ghost text-xl">✕</button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Write an username"
                            className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 6,
                                    message: "Username must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 14,
                                    message: "Username cannot exceed 11 characters"
                                },
                                pattern: {
                                    value: /^[A-Za-z]{2,}\d{1,}$/,
                                    message: "Must start with text followed by numbers"
                                }
                            })}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="dark:bg-[#272626] dark:text-white w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Password must be with in 10 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="dark:bg-white dark:hover:bg-gray-300 dark:text-black bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                            Sign Up
                        </button>
                        <p className="text-sm">
                            Already have an account?
                            <button onClick={()=>document.getElementById('my_modal_3').showModal()} className="ml-1 text-blue-500 cursor-pointer hover:underline">Login</button>
                            <Login/>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp