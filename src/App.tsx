import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
	const [loanAmount, setLoanAmount] = useState<number>(0);
	const [interestRate, setInterestRate] = useState<number>(0);
	const [loanTenure, setLoanTenure] = useState<number>(0);
	const [prepaymentAmount, setPrepaymentAmount] = useState<number | null>(null);
	const [emiDetails, setEmiDetails] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);

	// EMI Calculation Logic
	const calculateEMI = (e: React.FormEvent) => {
		e.preventDefault();
		if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
			setError('All values must be positive numbers.');
			return;
		}

		setError(null); // Clear any existing errors

		const monthlyInterestRate = interestRate / 12 / 100;
		const tenureInMonths = loanTenure * 12;
		const emi =
			(loanAmount *
				monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
			(Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

		const totalInterestPayable = emi * tenureInMonths - loanAmount;
		const totalAmountPayable = loanAmount + totalInterestPayable;
		const interestSaved = prepaymentAmount
			? totalInterestPayable - prepaymentAmount
			: 0;

		const results = {
			emi: emi.toFixed(2),
			totalInterest: totalInterestPayable.toFixed(2),
			totalAmountPayable: totalAmountPayable.toFixed(2),
			interestSaved: interestSaved.toFixed(2),
		};

		setEmiDetails(results);
	};

	return (
		<div className="h-[100vh] w-full flex justify-center items-center ">
			<div className="mx-auto p-6 bg-purple-300 w-fit h-fit flex flex-col justify-center rounded-md shadow-md shadow-purple-200  md:w-[70%l lg:w-[40%] w-[90%]">
				<h1 className="text-2xl font-semibold italic font-sans mb-6 text-center text-blue-600">
					Loan EMI Calculator
				</h1>

				<div className="flex items-center  justify-center bg-white flex-col rounded-md shadow-md  shadow-gray-50 py-3">
					<form
						onSubmit={calculateEMI}
						className="  rounded md:px-3 py-3 mx-auto md:grid grid-cols-1 md:grid-cols-2 md:items-center gap-2 md:justify-center "
					>
						{/* Loan Amount */}
						<div className="mb-4 ">
							<label
								htmlFor="loanAmount"
								className="block text-gray-700 text-[1rem] font-[500] font-serif mb-2"
							>
								Loan Amount
							</label>
							<input
								type="input"
								id="loanAmount"
								value={loanAmount}
								onChange={(e) => setLoanAmount(Number(e.target.value))}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter loan amount"
							/>
						</div>

						{/* Interest Rate */}
						<div className="mb-4">
							<label
								htmlFor="interestRate"
								className="block text-gray-700 text-[1rem] font-[500] font-serif mb-2"
							>
								Interest Rate (%)
							</label>
							<input
								type="text"
								id="interestRate"
								value={interestRate}
								onChange={(e) => setInterestRate(Number(e.target.value))}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter interest rate"
							/>
						</div>

						{/* Loan Tenure */}
						<div className="mb-4">
							<label
								htmlFor="loanTenure"
								className="block text-gray-700 text-[1rem] font-[500] font-serif mb-2"
							>
								Loan Tenure (Years)
							</label>
							<input
								type="number"
								id="loanTenure"
								value={loanTenure}
								onChange={(e) => setLoanTenure(Number(e.target.value))}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter loan tenure"
							/>
						</div>

						{/* Prepayment Amount (Optional) */}
						<div className="mb-4">
							<label
								htmlFor="prepaymentAmount"
								className="block text-gray-700 text-[1rem] font-[500] font-serif mb-2"
							>
								Prepayment Amount
							</label>
							<input
								type="number"
								id="prepaymentAmount"
								value={prepaymentAmount || ''}
								onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter prepayment amount (optional)"
							/>
						</div>

						{/* Error Message */}
						{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

						<div className="col-span-2 flex justify-center items-center">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto w-full md:w-[40%]"
							>
								Calculate EMI
							</button>
						</div>
					</form>

					{/* EMI Details */}
					{emiDetails && (
						<div className="bg-purple-500 rounded-md p-2 grid grid-cols-1 gap-2 justify-center text-white w-[90%]">
							<div className="flex justify-center md:gap-4 flex-col md:flex-row items-center gap-2 text-sm md:text-xl">
								<p>EMI: ₹{emiDetails.emi}</p>
								<p>Total Interest Payable: ₹{emiDetails.totalInterest}</p>
							</div>
							<div className="flex flex-col justify-center items-center">
								<p className="text-sm md:text-xl">
									Total Amount Payable (P+I): ₹{emiDetails.totalAmountPayable}
								</p>
								{emiDetails.interestSaved !== '0.00' && (
									<p>Total Interest Saved: ₹{emiDetails.interestSaved}</p>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoanCalculator;
