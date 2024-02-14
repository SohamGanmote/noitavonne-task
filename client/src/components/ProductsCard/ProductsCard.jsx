import React from "react";
import star from "../../assets/star.svg";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ product }) => {
	const navigate = useNavigate();
	return (
		<div className="max-w-xs rounded overflow-hidden shadow-lg bg-white text-black">
			<img
				className="w-full h-64 object-cover rounded-t"
				src={product.src}
				alt={product.productName}
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">{product.productName}</div>
				<p className="text-gray-700 text-base mb-2">{product.description}</p>
				<div className="flex items-center mb-4">
					<img src={star} alt="Rating" className="mr-2" width={15} />
					<span>{product.rating}</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-xl font-semibold">₹{product.price}</span>
					<span className="text-gray-600">{product.companyName}</span>
				</div>
			</div>
			<div className="px-6 py-4">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full w-full"
					onClick={() => navigate(`/products/${product.id}`)}
				>
					View Product
				</button>
			</div>
		</div>
	);
};

export default ProductsCard;
