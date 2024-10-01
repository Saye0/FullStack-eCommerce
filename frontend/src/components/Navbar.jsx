import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout, loading } = useUserStore()
    const isAdmin = (user?.role === "admin")

    const { cart } = useCartStore()

    return (
        <header className='fixed top-0 left-0 w-full bg-gray-900/40 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-white/10'>
            <div className='container mx-auto px-4 py-4'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Link to='/' className='text-4xl font-bold text-orange-400 items-center space-x-2 flex'>
                        E-Commerce
                    </Link>

                    <nav className='flex flex-wrap items-center gap-5'>
                        <Link
                            to={"/"}
                            className='text-xl text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out'
                        >
                            Home
                        </Link>

                        {user && (
                            <Link
                                to={"/cart"}
                                className='relative group text-xl text-gray-300 hover:text-orange-400 transition duration-300 
							ease-in-out'
                            >
                                <ShoppingCart className='inline-block mr-1 group-hover:text-orange-400' size={24} />
                                <span className='hidden sm:inline'>Cart</span>
                                {cart.length > 0 && (
                                    <span
                                        className='absolute -top-2 -left-2 bg-orange-500 text-white rounded-full px-2 py-0.5 
									text-sm group-hover:bg-orange-400 transition duration-300 ease-in-out'
                                    >
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}


                        {isAdmin ? (
                            <Link
                                className='bg-orange-700 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-xl font-medium transition duration-300 ease-in-out flex items-center'
                                to={"/secret-dashboard"}
                            >
                                <Lock className='inline-block mr-2' size={24} />
                                <span className='hidden sm:inline'>Dashboard</span>
                            </Link>
                        ) : ""}

                        {user ? (
                            <button onClick={logout}
                                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-md flex items-center transition duration-300 ease-in-out text-xl'
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader className='mr-2 h-7 w-7 animate-spin' aria-hidden='true' />
                                    </>
                                ) : (
                                    <>
                                        <LogOut size={24} />
                                        <span className='hidden sm:inline ml-2'>Log Out</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-orange-600 hover:bg-orange-700 text-white py-2 px-5 rounded-md flex items-center transition duration-300 ease-in-out text-xl'
                                >
                                    <UserPlus className='mr-2' size={24} />
                                    Sign Up
                                </Link>
                                <Link
                                    to={"/login"}
                                    className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-md flex items-center transition duration-300 ease-in-out text-xl'
                                >
                                    <LogIn className='mr-2' size={24} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;