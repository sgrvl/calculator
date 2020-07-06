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
	render() {
		return (
			<div className="Calculator">
				<Display display={this.state.display} />
				<Clear />
				<Keypad />
				<Operations />
				<Equal />
			</div>
		);
	}
}

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="display">
				<div id="top">0123456789</div>
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
				<button id="seven">7</button>
				<button id="eight">8</button>
				<button id="nine">9</button>
				<button id="four">4</button>
				<button id="five">5</button>
				<button id="six">6</button>
				<button id="one">1</button>
				<button id="two">2</button>
				<button id="three">3</button>
				<button id="zero">0</button>
				<button id="decimal">.</button>
			</div>
		);
	}
}

class Clear extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <button id="clear">AC</button>;
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
				<button id="add">&#43;</button>
				<button id="subtract">&#8722;</button>
				<button id="multiply">&#215;</button>
				<button id="divide">&#247;</button>
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
