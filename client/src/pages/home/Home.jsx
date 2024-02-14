import React, { useState, useEffect } from "react";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import cart from "../../assets/cart.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:8080")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				return response.json();
			})
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setLoading(true);
			fetch("http://localhost:8080")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch products");
					}
					return response.json();
				})
				.then((data) => {
					setProducts(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching products:", error);
					setLoading(false);
				});
			return;
		}
		setLoading(true);
		const delayTimer = setTimeout(() => {
			fetch(`http://localhost:8080/products/search/${searchTerm}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch products");
					}
					return response.json();
				})
				.then((data) => {
					setProducts(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching products:", error);
					setLoading(false);
				});
		}, 1000);

		return () => clearTimeout(delayTimer);
	}, [searchTerm]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);

		if (e.target.value.trim() === "") {
			setSuggestions([]);
			return;
		}

		fetch(`http://localhost:8080/products/suggestions/${searchTerm}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch suggestions");
				}
				return response.json();
			})
			.then((data) => {
				setSuggestions(data);
			})
			.catch((error) => {
				console.error("Error fetching suggestions:", error);
			});
	};

	const searchSuggestionsAutoFillHandler = (e) => {
		setSearchTerm(e);
		setSuggestions([]);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Products</h1>
				<div
					className="relative cursor-pointer"
					onClick={() => navigate("/checkout")}
				>
					{cartItems.length > 0 && (
						<p className="absolute bottom-0 bg-red-500 w-5 h-5 rounded-full text-[0.8rem] text-center">
							{cartItems.length}
						</p>
					)}
					<img src={cart} alt="cart" width={40} />
				</div>
			</div>
			<div className="mb-8">
				<input
					type="text"
					placeholder="Search by product name or company name"
					value={searchTerm}
					onChange={handleSearch}
					className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
				/>
				<div>
					{suggestions.map((suggestion) => (
						<div
							key={suggestion.id}
							onClick={() =>
								searchSuggestionsAutoFillHandler(suggestion.suggestion)
							}
							className="cursor-pointer hover:bg-blue-700 p-1"
						>
							{suggestion.suggestion}
						</div>
					))}
				</div>
			</div>
			{loading ? (
				<div className="flex justify-center items-center">
					<p>Loading...</p>
				</div>
			) : products.length === 0 ? (
				<div className="flex justify-center items-center">
					<p>No Such Product Available</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductsCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
