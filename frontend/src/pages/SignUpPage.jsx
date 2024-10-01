import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup, loading } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className='flex flex-col justify-center py-16 sm:px-6 lg:px-8'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-lg'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className='mt-6 text-center text-4xl font-extrabold text-orange-400'>Create your account</h2>
            </motion.div>

            <motion.div
                className='mt-10 sm:mx-auto sm:w-full sm:max-w-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className='bg-gray-800 py-10 px-6 shadow sm:rounded-lg sm:px-12'>
                    <form onSubmit={handleSubmit} className='space-y-8'>
                        <div>
                            <label htmlFor='name' className='block text-base font-medium text-gray-300'>
                                Full name
                            </label>
                            <div className='mt-2 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='h-6 w-6 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='name'
                                    type='text'
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className='block w-full px-3 py-3 pl-12 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                                     placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base'
                                    placeholder='John Doe'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='email' className='block text-base font-medium text-gray-300'>
                                Email address
                            </label>
                            <div className='mt-2 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='email'
                                    type='email'
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className='block w-full px-3 py-3 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-orange-500 
									 focus:border-orange-500 sm:text-sm'
                                    placeholder='you@example.com'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-base font-medium text-gray-300'>
                                Password
                            </label>
                            <div className='mt-2 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='password'
                                    type='password'
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className='block w-full px-3 py-3 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                                    placeholder='••••••••'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='confirmPassword' className='block text-base font-medium text-gray-300'>
                                Confirm Password
                            </label>
                            <div className='mt-2 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className='block w-full px-3 py-3 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                                    placeholder='••••••••'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='w-full flex justify-center py-3 px-4 border border-transparent 
							rounded-md shadow-sm text-base font-medium text-white bg-orange-600
							 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className='mr-3 h-6 w-6 animate-spin' aria-hidden='true' />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus className='mr-3 h-6 w-6' aria-hidden='true' />
                                    Sign up
                                </>
                            )}
                        </button>
                    </form>

                    <p className='mt-10 text-center text-base text-gray-400'>
                        Already have an account?{" "}
                        <Link to='/login' className='font-medium text-orange-400 hover:text-orange-300'>
                            Login here <ArrowRight className='inline h-5 w-5' />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
export default SignUpPage;