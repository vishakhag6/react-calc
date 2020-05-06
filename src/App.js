import React, { Component } from 'react';
import './App.scss';
import './App.css';

// import all components
import { KeypadComponent, ResultComponent } from './components';

class App extends Component {
  // state
  state = {
    showScientificCalc: false,
    currentTheme: 'light',
    themes: {
      light: {
        'main-bg-color': '#fff',
        'btn-bg-color': '#f0f0f0',
        'btn-font-color': '#000'
      },
      dark: {
        'main-bg-color': '#000',
        'btn-bg-color': '#666',
        'btn-font-color': '#fff'
      }
    },
    expr: ['0'], 
    justComputed: false
  }

  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleScientificCalc = this.toggleScientificCalc.bind(this);
  } 

  evaluate() {
    const {expr} = this.state;
    return {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      "/": (x, y) => x / y,
      "*": (x, y) => x * y,
    }[expr.splice(1, 1)](...expr.map(e => +e));
  }

  handleEq = e => {
    if (this.state.expr.length === 3) {
      this.setState({
        expr: ["" + this.evaluate()], 
        justComputed: true
      });
    }
  };

  handleClear = e => {
    this.setState({
      expr: ['0'], 
      justComputed: false
    });
  };

  handleNum = e => {
    const {justComputed, expr} = this.state;
    const num = e.target.name;

    if (justComputed) {
      this.setState({
        expr: [num], 
        justComputed: false
      });
    }
    else if (expr.length === 2) {
      this.setState({expr: expr.concat(num)});
    }
    else {
      this.setState({
        expr: expr.concat(+(expr.pop() + num) + "")
      });
    }
  };

  handleOp = e => {
    const {expr} = this.state;
    const op = e.target.name;
    
    if (expr.length === 1) {
      this.setState({
        expr: expr.concat(op), 
        justComputed: false
      });
    }
    else if (expr.length === 2) {
      this.setState({expr: expr.pop() && expr.concat(op)});
    }
    else {
      this.setState({expr: ["" + this.evaluate(), op]});
    }
  };

  handleScientificOp = e => {
    const {expr} = this.state;
    const scientificOp = e.target.name;

    if (expr.length === 1) {
      if(scientificOp === 'square') {
        this.setState({
          expr: ['' + Math.pow(expr, 2)], 
          justComputed: true
        });
      }
  
      if(scientificOp === 'root') {
        this.setState({
          expr: ['' + Math.sqrt(expr)], 
          justComputed: true
        });
      } 
    } else {
      this.setState({
        expr: ['Error'], 
        justComputed: false
      });
    }
  }

  componentDidMount () {
    this.setTheme()
  }

  // set theme initially
  setTheme = () => {
    const theme = this.state.themes[this.state.currentTheme]
    for (let key in theme) {
      const cssKey = `--${key}`
      const cssValue = theme[key]
      document.body.style.setProperty(cssKey, cssValue)
    }
  }
  
  // toggle theme
  toggleTheme () {
    if (this.state.currentTheme === 'light') {
      this.setState({
        currentTheme: 'dark'
      }, this.setTheme())
    } else {
      this.setState({
        currentTheme: 'light'
      }, this.setTheme())
    }
  }

  // toggle scientific calculator
  toggleScientificCalc () {
    this.setState({
      showScientificCalc: true
    })
  }

  render () {
    const {expr} = this.state;
    return (
      <div className="calculator">
        <div className="calculator__body">
          <div className="calculator__heading">Calculator</div>

          <div className="toggle__wrapper">
            <span className="btn" onClick={this.toggleScientificCalc}>Scientific Mode</span>  
            <span className="btn" onClick={this.toggleTheme}>Change Theme</span>  
          </div>

          <ResultComponent result={expr} />
          <KeypadComponent 
            showScientificCalc={this.state.showScientificCalc}  
            handleNum={this.handleNum} 
            handleOp={this.handleOp} 
            handleClear={this.handleClear}
            handleScientificOp={this.handleScientificOp}
            handleEq={this.handleEq}  />
        </div>
      </div>
    )
  }
}

export default App;
