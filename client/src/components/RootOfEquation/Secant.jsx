import axios from "axios";
import { useState, useEffect } from "react";
import { evaluate, max, min } from "mathjs";
import SecantTable from "./Table/SecantTable.jsx";
import Plot from "react-plotly.js";

const Secant = () => {
	const [normalGraphData, setNormalGraphData] = useState([]);
	const [data, setData] = useState([]);
	const [Equation, setEquation] = useState("(x^2)-7");
	const [X0, setX0] = useState(1);
	const [X1, setX1] = useState(1.5);
	const [Es, setEs] = useState("0.000001");
	const [Ans, setAns] = useState(0);
	const [OutputTable, setOutputTable] = useState(null);
	const [Iteration, setIteration] = useState(0); //for displaying iteration
	const [inaccuracy, setInaccuracy] = useState(100); //for displaying error

	let MAX = 50; //max iteration
	const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

	const CalSecant = (x0, x1, es) => {
		let start = x0;
		let xi;
		let obj = {};
		let ea = 100;
		let iter = 0;
		const fx = (x) => evaluate(Equation, { x: x });
		let tempData = [];

		do {
			iter++;
			xi = x1 - ((x1 - x0) * fx(x1)) / (fx(x1) - fx(x0));
			ea = error(x1, xi);
			obj = {
				iteration: iter,
				X: x0,
				Y: fx(x0),
				error: ea,
			};
			tempData.push(obj);
			x0 = x1;
			x1 = xi;
		} while (ea > es && iter < MAX);

		setData(tempData);
		setAns(xi);
		setIteration(iter); //for displaying iteration
		setInaccuracy(ea); //for displaying error

		axios
			.post(
				`${import.meta.env.VITE_API_URL}/save/rootequation/all`,
				{
					equation: Equation,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				//setSuccessText("Saved");
				console.log("saved success");
			})
			.catch((err) => {
				if (err.response) {
					//setErrorText(`${err.response.data.message}`);
					console.log("err.response.data.message");
				} else if (err.request) {
					//setErrorText("Server Down");
					console.log("Server Down");
				} else {
					// setErrorText(`Error: ${err.message}`);
					console.log("Error:", err.message);
				}
			});
	};

	useEffect(() => {
		const plotNormalGraph = () => {
			const x = [];
			const y = [];
			if (data.length > 0) {
				const Max = max(data.map((d) => d.X));
				const Min = min(data.map((d) => d.X));
				for (let i = Min; i <= Max; i += 0.01) {
					x.push(i);
					y.push(evaluate(Equation, { x: i }));
				}
				setNormalGraphData({ x, y });
			}
		};

		plotNormalGraph();
	}, [data, Equation]);

	const inputEquation = (event) => {
		setEquation(event.target.value);
	};

	const inputX0 = (event) => {
		setX0(event.target.value);
	};

	const inputX1 = (event) => {
		setX1(event.target.value);
	};

	const inputEs = (event) => {
		setEs(event.target.value);
	};

	const calculateRoot = () => {
		if (Equation === "" || X0 === "" || X1 === "" || Es === "") {
			alert("Please fill all the fields");
			return;
		}

		console.log(`Equation: ${Equation}`);
		console.log(`X0: ${X0}`);
		console.log(`X1: ${X1}`);
		console.log(`Es: ${Es}`);

		const x0Num = parseFloat(X0);
		const x1Num = parseFloat(X1);
		const esNum = parseFloat(Es);
		CalSecant(x0Num, x1Num, esNum);

		setOutputTable(<SecantTable data={data} />);

		console.log(data);
	};

	// Handle Enter Key Press
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			calculateRoot();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	useEffect(() => {
		setOutputTable(<SecantTable data={data} />);
	}, [data]);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="container p-4">
				<form>
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">
							X<sub>i+1</sub> =
						</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="Enter Equation"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="equation"
								value={Equation}
								onClick={() => setEquation("")}
								onChange={inputEquation}
							/>
						</div>
						<label className="text-base text-white">X0:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="1"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="X0"
								value={X0}
								onClick={() => setX0("")}
								onChange={inputX0}
							/>
						</div>
						<label className="text-base text-white">X1:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="1.5"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="X1"
								value={X1}
								onClick={() => setX1("")}
								onChange={inputX1}
							/>
						</div>
						<label className="text-base text-white">Error:</label>
						<div className="relative w-44 m-3 textInputWrapper">
							<input
								placeholder="Error Stop"
								type="text"
								className="w-full h-9 bg-[#292929] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="Es"
								value={Es}
								onClick={() => setEs("")}
								onChange={inputEs}
							/>
						</div>
					</div>

					<button
						type="button"
						className="mb-4 w-min cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
						onClick={calculateRoot}
					>
						Calculate
					</button>
				</form>

				<h5 className="mb-4 text-white bg-gray-800 rounded-lg p-4 border-2 border-[#262626] flex justify-center">
					Answer = {Ans.toPrecision(7)} | Total Iteration ={" "}
					{Iteration == MAX ? "Max" : Iteration} | Error ={" "}
					{inaccuracy.toPrecision(7)}
				</h5>

				<Plot
					data={[
						{
							x: normalGraphData.x,
							y: normalGraphData.y,
							type: "scatter",
							mode: "lines",
							name: "Normal Graph",
							line: { color: "orange", width: 1 },
						},
						{
							x: data.map((inputX) => inputX.X),
							y: data.map((inputY) => inputY.Y),
							type: "scatter",
							mode: "markers",
							name: "Secant",
							marker: { color: "yellow", size: 8 },
							line: { color: "red", width: 2 },
						},
					]}
					style={{
						width: "100%",
						height: "400px",
					}}
					layout={{
						title: "Secant",
						xaxis: { title: "X Axis" },
						yaxis: { title: "Y Axis" },
						dragmode: "pan",
						paper_bgcolor: "black",
						plot_bgcolor: "black",
					}}
					config={{
						displayModeBar: false, // Hide the modebar
						scrollZoom: true, // Enable zoom with scroll
						doubleClick: "reset", // Reset on double-click
						displaylogo: false, // Hide Plotly logo
					}}
				/>
				{OutputTable}
			</div>
		</div>
	);
};

export default Secant;
