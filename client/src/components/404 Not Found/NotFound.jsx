import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto px-4 py-8 text-center text-white">
			<h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="mb-8">The page you're looking for does not exist.</p>
			<button
				onClick={() => navigate("/")}
				className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
			>
				Go to Home
			</button>
		</div>
	);
};

export default NotFound;
