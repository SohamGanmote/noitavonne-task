import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import start from "../../assets/star.svg";
import back from "../../assets/back.svg";
import { addItemToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8080/products/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch product details");
				}
				return response.json();
			})
			.then((data) => {
				setProduct(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching product details:", error);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <p>Loading...</p>;
	}

	const handleAddToCart = () => {
		dispatch(addItemToCart(product));
	};

	return (
		<div className="mx-auto p-8 bg-white text-black popcenter rounded-md">
			<div className="max-w-4xl mx-auto">
				<div
					className="absolute top-[-20px] left-[-20px] p-3 bg-white rounded-full shadow-xl"
					onClick={() => navigate("/")}
				>
					<img src={back} alt="back" width={40} className="cursor-pointer" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div>
						<img
							className="w-4/5 rounded-lg shadow-lg"
							src={product.src}
							alt={product.productName}
						/>
					</div>
					<div className="flex flex-col justify-center">
						<h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
						<p className="text-gray-700 mb-4">{product.description}</p>
						<div className="flex items-center mb-4">
							<img src={start} alt="Rating" width={15} className="mr-2" />
							<span className="text-gray-600">{product.rating}</span>
						</div>
						<p className="text-xl font-semibold mb-4">₹{product.price}</p>
						<p className="text-gray-600 mb-4">
							Company:{" "}
							<span className="font-medium">{product.companyName}</span>
						</p>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-md"
							onClick={handleAddToCart}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
