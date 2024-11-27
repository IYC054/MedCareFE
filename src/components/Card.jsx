import React from 'react'
import { motion } from "framer-motion";

const Card = ({ name, specialty, price, rating, visits, avatar }) => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md rounded-lg p-4 w-72"
    >
      <div className="flex flex-col items-center">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full mb-3"
        />
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{specialty}</p>
        <p className="text-sm text-gray-700 font-medium mt-2">{price}đ</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-yellow-400 text-sm">{rating}★</span>
          <span className="text-gray-500 ml-2 text-sm">({visits} lượt khám)</span>
        </div>
        <button className="bg-blue-500 text-white text-sm py-1 px-4 rounded hover:bg-blue-600 transition">
          Tư vấn ngay
        </button>
      </div>
    </motion.div>
  )
}

export default Card