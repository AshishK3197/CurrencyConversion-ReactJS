import "./App.css";
import React, { useEffect, useState } from "react";
import Input from "./Components/Input";
import axios from "./axios";

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState("");
	const [toCurrency, setToCurrency] = useState("");
	const [exchangeRate, setExchangeRate] = useState([]);
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	// console.log(currencyOptions);
	// console.log(fromCurrency, toCurrency);
	// console.log(exchangeRate);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	const handleFromAmountChange = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const handleToAmountChange = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};

	useEffect(() => {
		async function fetchDataOnCurrencyChange() {
			try {
				const response = await axios.get(
					`?base=${fromCurrency}&symbol=${toCurrency}`
				);
				console.log(response);
				setExchangeRate(response.data.rates[toCurrency]);
			} catch (error) {
				console.log(error);
			}
		}

		if (fromCurrency != null && toCurrency != null) {
			fetchDataOnCurrencyChange();
		}
	}, [fromCurrency, toCurrency]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get();
			// console.log(request);
			setCurrencyOptions([
				request.data.base,
				...Object.keys(request.data.rates),
			]); //only setting keys of dictionary into state considering base value and all the other values in the aaray using spread operatort

			const firstCurrency = Object.keys(request.data.rates)[0];
			setFromCurrency(request.data.base);
			setToCurrency(firstCurrency);
			setExchangeRate(request.data.rates[firstCurrency]);
			return request;
		}

		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>Convert Currency</h1>
			<Input
				currencyOptionsToSet={currencyOptions}
				selectedCurrency={fromCurrency}
				amount={fromAmount}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				onChangeAmount={handleFromAmountChange}
				className="App__input"
			/>
			<div className="App__equals">=</div>
			<Input
				currencyOptionsToSet={currencyOptions}
				selectedCurrency={toCurrency}
				amount={toAmount}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				onChangeAmount={handleToAmountChange}
				className="App__input"
			/>
		</div>
	);
}

export default App;
