import React, { Component } from "react";
import "./App.css";
import { create, all } from "mathjs";

const math = create(all);

function App() {
	return (
		<div className="App">
			<h1>React Calculator!</h1>
			<p>(work in progress)</p>
			<Calculator />
		</div>
	);
}

class Calculator extends Component {
	state = {
		display: "0",
		equation: "",
		result: false,
		click: true,
	};

	handleOperator = (key) => {
		if (this.state.result === false) {
			this.setState({ display: key });
		}
	};

	handleKey = (key, res = false) => {
		const regex = /[0+\-*/.]/;
		if (this.state.result === false) {
			this.setState({
				display: regex.test(this.state.display[0])
					? this.state.display.replace(regex, key)
					: this.state.display.concat(key),
				result: res,
			});
		}
	};

	handleClearEntries = () => {
		this.setState({
			display: "0",
			equation: "",
			result: false,
			click: true,
		});
	};

	getEquation = (eq) => {
		this.setState({
			equation: eq, //.concat(this.state.display),
		});
	};

	handleResult = (res) => {
		this.setState({
			display: res,
		});
	};

	isClick = (c) => {
		this.setState({
			click: c,
		});
	};

	render() {
		return (
			<div className="Calculator">
				<Display
					display={this.state.display}
					isConcat={this.state.isConcat}
					getEquation={this.getEquation}
					equation={`${this.state.equation}=${this.state.display}`}
					result={this.state.result}
				/>
				<ClearEntry handleClearEntries={this.handleClearEntries} />
				<Keypad handleKey={this.handleKey} />
				<Operations handleOperator={this.handleOperator} />
				<Equal
					equation={this.state.equation}
					handleKey={this.handleKey}
					handleResult={this.handleResult}
					clicked={this.state.click}
					isClick={this.isClick}
				/>
			</div>
		);
	}
}

class Display extends Component {
	state = {
		topDisplay: "",
	};

	componentDidUpdate(prevProps) {
		if (this.props.display !== prevProps.display) {
			const display = this.props.display;
			this.setState({
				topDisplay: this.props.result
					? this.props.equation
					: this.props.display === "0"
					? ""
					: this.state.topDisplay.concat(display[display.length - 1]),
			});
			this.props.getEquation(this.state.topDisplay);
		}
	}

	render() {
		console.log(this.props.result);
		return (
			<div className="DisplayWrap">
				<div className="top" id="display">
					{this.state.topDisplay}
				</div>
				<div className="bot" id="display">
					{this.props.display}
				</div>
			</div>
		);
	}
}

class Keypad extends Component {
	render() {
		return (
			<div className="Keypad">
				<button id="seven" onClick={() => this.props.handleKey("7")}>
					7
				</button>
				<button id="eight" onClick={() => this.props.handleKey("8")}>
					8
				</button>
				<button id="nine" onClick={() => this.props.handleKey("9")}>
					9
				</button>
				<button id="four" onClick={() => this.props.handleKey("4")}>
					4
				</button>
				<button id="five" onClick={() => this.props.handleKey("5")}>
					5
				</button>
				<button id="six" onClick={() => this.props.handleKey("6")}>
					6
				</button>
				<button id="one" onClick={() => this.props.handleKey("1")}>
					1
				</button>
				<button id="two" onClick={() => this.props.handleKey("2")}>
					2
				</button>
				<button id="three" onClick={() => this.props.handleKey("3")}>
					3
				</button>
				<button id="zero" onClick={() => this.props.handleKey("0")}>
					0
				</button>
				<button id="decimal" onClick={() => this.props.handleKey(".")}>
					.
				</button>
			</div>
		);
	}
}

class ClearEntry extends Component {
	render() {
		return (
			<button id="clear" onClick={this.props.handleClearEntries}>
				AC
			</button>
		);
	}
}

class Operations extends Component {
	render() {
		return (
			<React.Fragment>
				<button
					id="add"
					className="operators"
					onClick={() => this.props.handleOperator("+")}
				>
					&#43;
				</button>
				<button
					id="subtract"
					className="operators"
					onClick={() => this.props.handleOperator("-")}
				>
					&#8722;
				</button>
				<button
					id="multiply"
					className="operators"
					onClick={() => this.props.handleOperator("*")}
				>
					&#215;
				</button>
				<button
					id="divide"
					className="operators"
					onClick={() => this.props.handleOperator("/")}
				>
					&#247;
				</button>
			</React.Fragment>
		);
	}
}

class Equal extends Component {
	handleKey = () => {
		this.props.handleKey("=", true);
	};

	handleEq = () => {
		this.props.handleResult(`${math.evaluate(this.props.equation)}`);
	};

	isClick = (c) => {
		this.props.isClick(c);
	};

	onClick = async () => {
		await this.handleKey();
		this.handleEq();
		this.isClick(false);
	};

	render() {
		return (
			<button id="equals" onClick={this.props.clicked ? this.onClick : null}>
				&#61;
			</button>
		);
	}
}

export default App;
