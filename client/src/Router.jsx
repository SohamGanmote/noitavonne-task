import { createBrowserRouter, RouterProvider } from "react-router-dom";

//* component imports
import Root from "./pages/Root";
import NotFound from "./components/404 Not Found/NotFound";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Checkout from "./pages/checkout/Checkout";

const Router = () => {
	const router = createBrowserRouter([
		//* default routes
		{
			path: "",
			element: <Root />,
			errorElement: <NotFound />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "/products/:id", element: <ProductDetails /> },
				{ path: "/checkout", element: <Checkout /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
