import React, { Component } from "react";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>React Calculator!</h1>
			<Calculator />
		</div>
	);
}

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "0",
		};
	}

	handleOperator = (key) => this.setState({ display: key });

	handleKey = (key) => {
		this.setState({
			display:
				this.state.display === "0"
					? this.state.display.replace("0", key)
					: this.state.display.concat(key),
		});
	};

	handleClearEntries = () => {
		this.setState({
			display: "0",
		});
	};

	render() {
		return (
			<div className="Calculator">
				<Display display={this.state.display} isConcat={this.state.isConcat} />
				<GlobalClear />
				<ClearEntry handleClearEntries={this.handleClearEntries} />
				<Keypad handleKey={this.handleKey} />
				<Operations handleOperator={this.handleOperator} />
				<Equal />
			</div>
		);
	}
}

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topDisplay: "",
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.display !== prevProps.display) {
			const display = this.props.display;
			this.setState({
				topDisplay:
					this.props.display === "0"
						? ""
						: this.state.topDisplay.concat(display[display.length - 1]),
			});
		}
	}

	render() {
		return (
			<div id="display">
				<div id="top">{this.state.topDisplay}</div>
				<div id="bot">{this.props.display}</div>
			</div>
		);
	}
}

class Keypad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: "",
		};
	}

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

class GlobalClear extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <button id="globalclear">C</button>;
	}
}

class ClearEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<button id="clear" onClick={this.props.handleClearEntries}>
				CE
			</button>
		);
	}
}

class Operations extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<button id="add" onClick={() => this.props.handleOperator("+")}>
					&#43;
				</button>
				<button id="subtract" onClick={() => this.props.handleOperator("-")}>
					&#8722;
				</button>
				<button id="multiply" onClick={() => this.props.handleOperator("*")}>
					&#215;
				</button>
				<button id="divide" onClick={() => this.props.handleOperator("/")}>
					&#247;
				</button>
			</React.Fragment>
		);
	}
}

class Equal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <button id="equals">&#61;</button>;
	}
}

export default App;
