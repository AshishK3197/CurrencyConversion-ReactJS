import "./App.css";
import React, { useEffect } from "react";
import Input from "./Components/Input";
import axios from "./axios";

function App() {
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get();
			console.log(request);
			return request;
		}

		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>Convert Currency</h1>
			<Input className="App__input" />
			<div className="App__equals">=</div>
			<Input className="App__input" />
		</div>
	);
}

export default App;
