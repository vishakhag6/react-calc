import React, {Component} from 'react'

class KeyPadComponent extends Component {
    render () {
        // console.log(this.props)
        const {handleNum, handleOp, handleEq, handleClear, showScientificCalc, handleScientificOp} = this.props
        return (
            <div className="buttonWrapper">
                <button style={{width: '100%'}} key="C" name="C" onClick={handleClear}>Clear</button>

                {showScientificCalc ? (
                <div>
                    <button style={{width: '50%'}} key="square" name="square" onClick={handleScientificOp}>Square</button>
                    <button style={{width: '50%'}} key="root" name="root" onClick={handleScientificOp}>Square Root (&#x0221A;)</button><br/>
                </div> ) : ''}

                {[..."1234567890"].map(e =>
                    <button key={e} name={e} onClick={handleNum}>{e}</button>
                )}

                {[..."+-/*"].map(e =>
                    <button key={e} name={e} onClick={handleOp}>{e}</button>
                )}

                <button key="=" name="=" onClick={handleEq}>=</button>
                
            </div>
        )
    }
}

export default KeyPadComponent;