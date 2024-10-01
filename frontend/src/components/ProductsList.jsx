import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();


    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className='min-w-full divide-y divide-gray-700'>
                <thead className='bg-gray-700'>
                    <tr>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Product
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Price
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Category
                        </th>

                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Featured
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                    {products?.map((product) => (
                        <tr key={product._id} className='hover:bg-gray-700'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-12 w-12'>
                                        <img
                                            className='h-12 w-12 rounded-full object-cover'
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-base font-medium text-white'>{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-base text-gray-300'>${product.price?.toFixed(2)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-base text-gray-300'>{product.category}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button
                                    onClick={() => toggleFeaturedProduct(product._id)}
                                    className={`p-2 rounded-full ${product.isFeatured ? "bg-orange-400 text-gray-900" : "bg-gray-600 text-gray-300"
                                        } hover:bg-orange-500 transition-colors duration-200`}
                                >
                                    <Star className='h-6 w-6' />
                                </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-base font-medium'>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className='text-red-400 hover:text-red-300'
                                >
                                    <Trash className='h-6 w-6' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};
export default ProductsList;