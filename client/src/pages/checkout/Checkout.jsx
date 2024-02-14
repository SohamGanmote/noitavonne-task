import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);

	const handleRemoveFromCart = (item) => {
		dispatch(removeItemFromCart(item.id));
	};

	return (
		<div className="container mx-auto px-4 py-8 text-white">
			<h1 className="text-3xl font-bold mb-4">Checkout</h1>
			{cartItems.length === 0 ? (
				<div>
					<p>Your cart is empty.</p>
					<button
						className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-md"
						onClick={() => navigate("/")}
					>
						Add products
					</button>
				</div>
			) : (
				<div>
					{cartItems.map((item) => (
						<div
							key={item.id}
							className="flex items-center border-b border-gray-300 py-2"
						>
							<img
								src={item.src}
								alt={item.productName}
								className="w-20 h-20 object-cover mr-4"
							/>
							<div>
								<h2 className="text-lg font-bold">{item.productName}</h2>
								<p className="text-sm ">{item.companyName}</p>
								<p>{item.price}</p>
								<button
									className="text-red-500"
									onClick={() => handleRemoveFromCart(item)}
								>
									Remove
								</button>
							</div>
						</div>
					))}
					<button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-md">
						Checkout
					</button>
				</div>
			)}
		</div>
	);
};

export default Checkout;
