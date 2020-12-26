import "./App.css";
import Input from "./Components/Input";

function App() {
	return (
		<div className="App">
			<h2>Convert Currency</h2>
			<Input className="App__input" />
			<div className="App__equals">=</div>
			<Input className="App__input" />
		</div>
	);
}

export default App;
