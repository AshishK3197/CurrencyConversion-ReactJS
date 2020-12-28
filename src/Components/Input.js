import React from "react";
import "./Input.css";

function Input({
	currencyOptionsToSet,
	selectedCurrency,
	onChangeCurrency,
	amount,
	onChangeAmount,
}) {
	// console.log(selectedCurrency);
	return (
		<div>
			<input
				type="number"
				className="input"
				value={amount}
				onChange={onChangeAmount}
			/>
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{currencyOptionsToSet.map((currency) => {
					return (
						<option key={currency} value={currency}>
							{currency}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default Input;
