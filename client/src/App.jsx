import "./App.css";
import Router from "./Router";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Router />
			<ToastContainer theme="dark" position="bottom-right" />
		</>
	);
}

export default App;
