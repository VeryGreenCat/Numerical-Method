import React from "react";
import { useState, useEffect } from "react";
import { add, subtract, multiply, dot, transpose } from "mathjs";
import ConjugateTable from "./Table/ConjugateTable.jsx";
import Plot from "react-plotly.js";

function ConjugateGradient() {
	const [Amatrix, setAmatrix] = useState([
		[27, 6, -1],
		[6, 15, 2],
		[1, 1, 54],
	]);
	const [Bmatrix, setBmatrix] = useState([54, 72, 110]);
	const [Xmatrix, setXmatrix] = useState(Array(3).fill("X"));
	const [X0matrix, setX0matrix] = useState([0, 0, 0]);
	const [data, setData] = useState([]);
	const [Iteration, setIteration] = useState(0);
	const [inaccuracy, setInaccuracy] = useState(100);
	const [Es, setEs] = useState("0.000001");
	const [numFields, setNumFields] = useState(3);
	const [OutputTable, setOutputTable] = useState(null);

	const MAX = 50;
	const error = (R0) => Math.sqrt(dot(R0, R0));

	const CalconjugateGradient = (A, B, X0, es) => {
		let R0, D0, lambda, numerator, denominator, X1;
		let iter = 0;
		let tol = es;
		let obj;
		let tempData = [];

		do {
			iter++;
			R0 = subtract(B, multiply(A, X0)); // R0 = B - A * X0
			D0 = R0.map((val) => -val); //D0 = -R0

			numerator = dot(transpose(D0), R0); // D0^T * R0
			denominator = dot(transpose(D0), multiply(A, D0)); // D0^T * A * D0
			lambda = numerator / denominator;

			X1 = add(X0, multiply(lambda, D0)); // X1 = X0 + lambda * D0
			obj = {
				iteration: iter,
				X0: X0.map((value) => Math.round(value * 1e6) / 1e6),
				R0: R0.map((value) => Math.round(value * 1e6) / 1e6),
				D0: D0.map((value) => Math.round(value * 1e6) / 1e6),
				lambda: Math.round(lambda * 1e6) / 1e6,
				error: Math.round(error(R0) * 1e6) / 1e6,
			};
			tempData.push(obj);

			X0 = X1;
		} while (error(R0) > tol && iter < MAX);

		setData(tempData);
		setXmatrix(X1.map((value) => Math.round(value * 1e6) / 1e6));
		setIteration(iter);
		setInaccuracy(error(R0));
	};

	const inputNumFields = (event) => {
		const num = parseInt(event.target.value, 10) || 0;
		setNumFields(num);
		setAmatrix(
			Array(num)
				.fill(null)
				.map(() => new Array(num).fill(""))
		);

		setBmatrix(Array(num).fill(""));
		setX0matrix(Array(num).fill(""));
		setXmatrix(Array(num).fill("X"));
	};

	const AValueChange = (row, col, value) => {
		const newAmatrix = [...Amatrix];
		newAmatrix[row][col] = value;
		setAmatrix(newAmatrix);
	};

	const BValueChange = (index, value) => {
		const newBmatrix = [...Bmatrix];
		newBmatrix[index] = value;
		setBmatrix(newBmatrix);
	};

	const X0ValueChange = (index, value) => {
		const newX0matrix = [...X0matrix];
		newX0matrix[index] = value;
		setX0matrix(newX0matrix);
	};

	const handleSubmit = (event) => {
		CalconjugateGradient(Amatrix, Bmatrix, X0matrix, Es);
		setOutputTable(<ConjugateTable data={data} />);
	};

	useEffect(() => {
		setOutputTable(<ConjugateTable data={data} />);
	}, [data]);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="mb-4 container p-4">
				<form className="flex flex-col items-center justify-center">
					<div className="mb-4 flex justify-center space-x-4 items-center">
						<label className="text-base text-white">Input size:</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="3"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="numFields"
								value={numFields}
								onClick={() => setNumFields("")}
								onChange={inputNumFields}
							/>
						</div>
						<label className="text-base text-white">Error:</label>
						<div className="relative w-44 textInputWrapper">
							<input
								placeholder="0.000001"
								type="text"
								className="w-full h-9 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-t-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
								id="numFields"
								value={Es}
								onClick={() => setEs("")}
								onChange={(event) => setEs(event.target.value)}
							/>
						</div>
						<button
							type="button"
							className="w-min cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg border-blue-700 border-b-[4px] hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[2px] active:brightness-90"
							onClick={handleSubmit}
						>
							Calculate
						</button>
					</div>

					<h1 className="mx-2 text-2xl">Ax = B</h1>
					<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
						<div className="mx-2 space-y-2">
							{Amatrix.map((row, rowIndex) => (
								<div key={rowIndex} className="flex space-x-2">
									{row.map((value, colIndex) => (
										<input
											key={colIndex}
											placeholder="0"
											type="text"
											className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium py-3 px-3 rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
											value={value}
											onChange={(e) =>
												AValueChange(rowIndex, colIndex, e.target.value)
											}
										/>
									))}
								</div>
							))}
						</div>
						<div className="mx-2 space-y-2 flex flex-col items-center">
							{Xmatrix.map((value, index) => (
								<input
									key={index}
									placeholder="0"
									type="text"
									className="text-center w-24 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
									value={value}
									readOnly
								/>
							))}
						</div>
						<h1 className="mx-2 text-2xl">=</h1>
						<div className="mx-2 space-y-2 flex flex-col items-center">
							{Bmatrix.map((value, index) => (
								<input
									key={index}
									placeholder="0"
									type="text"
									className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
									value={value}
									onChange={(e) => BValueChange(index, e.target.value)}
								/>
							))}
						</div>
					</div>

					<div className="mt-4 max-w-5xl mx-auto inline-flex justify-center items-center">
						<h1 className="mx-2 text-2xl">
							X<sub>0</sub> ={" "}
						</h1>
						<div className="mx-2 space-x-2">
							{X0matrix.map((value, index) => (
								<input
									key={index}
									placeholder="0"
									type="text"
									className="text-center w-11 h-11 bg-[#262626] text-[#e8e8e8] text-sm font-medium rounded-md shadow-lg placeholder-opacity-60 placeholder-white/60 focus:bg-[#353535] focus:outline-none transition-all"
									value={value}
									onChange={(e) => X0ValueChange(index, e.target.value)}
								/>
							))}
						</div>
					</div>
				</form>
				<h5 className="mb-4 mt-4 text-white bg-gray-800 rounded-lg p-4 border-2 border-[#262626] flex justify-center">
					Answer = [{Xmatrix.join(", ")}] | Total Iteration ={" "}
					{Iteration == MAX ? "Max" : Iteration} | Error ={" "}
					{inaccuracy.toPrecision(7)}
				</h5>
				{/*<Plot
					data={[
						{
							z: [
								[100, 80, 60, 80, 100],
								[80, 60, 40, 60, 80],
								[60, 40, 20, 40, 60],
								[80, 60, 40, 60, 80],
								[100, 80, 60, 80, 100],
							],
							type: "surface",
							colorscale: "Viridis",
							showscale: true,
							contours: {
								z: {
									show: true,
									highlightwidth: 2,
									highlightcolor: "#42f5e6",
									project: { z: true },
								},
							},
						},
						{
							x: data.map((item) => item.X0[0]),
							y: data.map((item) => item.X0[1]),
							z: data.map((item) => item.X0[2]),
							type: "scatter3d",
							mode: "markers+lines",
							marker: {
								size: 5,
								color: data.map((item, index) => index),
								colorscale: "Bluered",
								colorbar: { title: "Iteration" },
							},
							line: {
								color: "white",
								width: 3,
							},
						},
					]}
					style={{
						width: "100%",
						height: "500px",
					}}
					layout={{
						title: "Conjugate Gradient Method Path in 3D",
						scene: {
							xaxis: { title: "X0[0]", gridcolor: "gray" },
							yaxis: { title: "X0[1]", gridcolor: "gray" },
							zaxis: { title: "X0[2]", gridcolor: "gray" },
							camera: {
								eye: { x: 1.2, y: 1.2, z: 1.2 }, // Enhanced view angle
							},
							aspectratio: { x: 1, y: 1, z: 1 },
							dragmode: "orbit",
						},
						paper_bgcolor: "black",
						plot_bgcolor: "black",
					}}
					config={{ displaylogo: false, scrollZoom: true }}
				/> */}

				{OutputTable}
			</div>
		</div>
	);
}

export default ConjugateGradient;
