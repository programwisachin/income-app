import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
	let history = useNavigate();
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
		const { inv, rent, city, med } = secondFormcredentials;
		console.log(inv, rent, city, med);
		if (inv && rent && city && med) {
            console.log(secondFormcredentials);
		}
	};

	return (
		<div className="home">
			{/* first form */}
			{isFirstForm && <div id="firstForm">
				<div className="innerFormField">
					<input type="number" id="bas" name="bas" onChange={firstFormOnChange} required/>
					<label htmlFor="bas">Basic</label>
				</div>
				<div className="innerFormField">
					<input type="number" id="lta" name="lta" onChange={firstFormOnChange} required />
					<label htmlFor="lta">LTA</label>
				</div>
				<div className="innerFormField">
					<input type="number" id="hra" name="hra" onChange={firstFormOnChange} required/>
					<label htmlFor="hra">HRA</label>
				</div>
				<div className="innerFormField">
					<input type="number" id="fa" name="fa" onChange={firstFormOnChange} required/>
					<label htmlFor="fa">Food Allowance</label>
				</div>
                <button className="btn" onClick={firstFormSubmit}>Next</button>
                
    </div>}

			{/* second form */}
			{!isFirstForm && (
				<div id="secondForm">
					<div className="innerFormField">
						<input type="number" id="inv" name="inv" onChange={secondFormOnChange} required />
						<label htmlFor="inv">Investment</label>
					</div>
					<div className="innerFormField">
						<input type="number" id="rent" name="rent" onChange={secondFormOnChange} required />
						<label htmlFor="rent">Rent</label>
					</div>
					<div className="radio">
						<label className="city">City Type</label>
						<label class="radioLabel">
							<input type="radio" class="radioInput" onChange={secondFormOnChange} name="city" value="metro"/>
							<div class="radioDesign"></div>
							<div class="radioText">Metro</div>
						</label>
						<label class="radioLabel">
							<input type="radio" class="radioInput" onChange={secondFormOnChange} name="city" value="non-metro"/>
							<div class="radioDesign"></div>
							<div class="radioText">Non-Metro</div>
						</label>
					</div>
					<div className="innerFormField">
						<input type="number" id="med" name="med" onChange={secondFormOnChange} required />
						<label htmlFor="med">Mediclaim</label>
					</div>
					<button className="submit btn" onClick={secondFormSubmit}>Submit</button>
				</div>
			)}
		</div>
	);
};

export default Home;
