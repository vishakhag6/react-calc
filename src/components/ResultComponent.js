import React, { Component } from 'react';

class ResultComponent extends Component {
    render () {
        let {result} = this.props
        // console.log(result)
        return (
            <div className="result">
              <p>{result.length < 3 ? result[0] : result[2]}</p>
            </div>
        )
    }
}

export default ResultComponent