import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Modal from "./Modal";
const Home = () => {
	let history = useNavigate();
	let AppHra = 0;
	let TaxInc = 0;
	useEffect(() => {
		if (localStorage.getItem("token")) {
			history("/");
		} else {
			history("/login");
		}
	}, []);

	const [firstFormcredentials, setFirstFormCredentials] = useState({
		bas: null,
		lta: null,
		hra: null,
		fa: null,
	});

	const [isFirstForm, setIsFirstForm] = useState(true);
	const [modal, setModal] = useState(false);
	const [taxInc, setTaxInc] = useState(0);
	const [appHra, setAppHra] = useState(0);
	const firstFormOnChange = (e) => {
		console.log(e.target.value);
		setFirstFormCredentials({
			...firstFormcredentials,
			[e.target.name]: e.target.value,
		});
	};

	const firstFormSubmit = () => {
		const { bas, lta, hra, fa } = firstFormcredentials;
		console.log(bas, lta, hra, fa);
		if (bas && lta && hra && fa) {
			setIsFirstForm(false);
		}
		console.log(firstFormcredentials);
	};

	//
	//
	//

	const [secondFormcredentials, setSecondFormCredentials] = useState({
		inv: null,
		rent: null,
		city: null,
		med: null,
	});

	const secondFormOnChange = (e) => {
		console.log(e.target.value);
		setSecondFormCredentials({
			...secondFormcredentials,
			[e.target.name]: e.target.value,
		});
	};

	const secondFormSubmit = () => {
		const { bas, lta, hra, fa } = firstFormcredentials;
		const { inv, rent, city, med } = secondFormcredentials;
		console.log(inv, rent, city, med);
		if (inv && rent && city && med) {
			console.log(secondFormcredentials);
			if (city === "metro") {
				setAppHra(
					Math.min((bas * (50 / 100)), (rent - bas * (10 / 100)), hra)
				);
			} else {
				setAppHra(
					Math.min((bas * (40 / 100)), (rent - bas * (10 / 100)), hra)
                    );
			}
            console.log(appHra)
			setTaxInc((eval(bas) + eval(lta) + eval(hra) + eval(fa)) - eval(appHra) - eval(inv) - eval(med));
			setModal(true);
		}
	};

	const { bas, lta, hra, fa } = firstFormcredentials;
	const { inv, rent, city, med } = secondFormcredentials;
	return (
		<div className="home">
            <h1 style={{fontSize:"4vw",color:"white"}}>Welcome to Income Tax Official Page</h1>
            <h3 style={{color:"white"}}>Please fill the necessary information in the below form</h3>
			{/* first form */}
			{isFirstForm && (
				<div id="firstForm">
					<div className="innerFormField">
						<input
							type="number"
							id="bas"
							name="bas"
							onChange={firstFormOnChange}
							required
						/>
						<label htmlFor="bas">Basic</label>
					</div>
					<div className="innerFormField">
						<input
							type="number"
							id="lta"
							name="lta"
							onChange={firstFormOnChange}
							required
						/>
						<label htmlFor="lta">LTA</label>
					</div>
					<div className="innerFormField">
						<input
							type="number"
							id="hra"
							name="hra"
							onChange={firstFormOnChange}
							required
						/>
						<label htmlFor="hra">HRA</label>
					</div>
					<div className="innerFormField">
						<input
							type="number"
							id="fa"
							name="fa"
							onChange={firstFormOnChange}
							required
						/>
						<label htmlFor="fa">Food Allowance</label>
					</div>
					<button className="btn" onClick={firstFormSubmit}>
						Next
					</button>
				</div>
			)}

			{/* second form */}
			{!isFirstForm && (
				<div id="secondForm">
					<div className="innerFormField">
						<input
							type="number"
							id="inv"
							name="inv"
							onChange={secondFormOnChange}
							required
						/>
						<label htmlFor="inv">Investment</label>
					</div>
					<div className="innerFormField">
						<input
							type="number"
							id="rent"
							name="rent"
							onChange={secondFormOnChange}
							required
						/>
						<label htmlFor="rent">Rent</label>
					</div>
					<div className="radio">
						<label className="city">City Type</label>
						<label class="radioLabel">
							<input
								type="radio"
								class="radioInput"
								onChange={secondFormOnChange}
								name="city"
								value="metro"
							/>
							<div class="radioDesign"></div>
							<div class="radioText">Metro</div>
						</label>
						<label class="radioLabel">
							<input
								type="radio"
								class="radioInput"
								onChange={secondFormOnChange}
								name="city"
								value="non-metro"
							/>
							<div class="radioDesign"></div>
							<div class="radioText">Non-Metro</div>
						</label>
					</div>
					<div className="innerFormField">
						<input
							type="number"
							id="med"
							name="med"
							onChange={secondFormOnChange}
							required
						/>
						<label htmlFor="med">Mediclaim</label>
					</div>
					<button className="submit btn" onClick={secondFormSubmit}>
						Submit
					</button>
					{modal && (
						<Modal trigger={modal} setModal={setModal}>
							<h4>Basic: {bas}</h4>
							<h4>LTA: {lta}</h4>
							<h4>HRA: {hra}</h4>
							<h4>fA: {fa}</h4>
							<h4>Investment: {inv}</h4>
							<h4>Rent: {rent}</h4>
							<h4>City: {city}</h4>
							<h4>Mediclaim: {med}</h4>
							<h3>Tax Inc: {taxInc}</h3>
						</Modal>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
