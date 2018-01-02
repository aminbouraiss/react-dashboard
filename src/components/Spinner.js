
import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spin';

class SpinnerCompo extends React.Component {

    constructor(props) {
        super(props);
        this.stopped = !this.props.spin
    }

    render() {
        var spinCfg = {
            width: 12,
            radius: 35
          };
          let stopped = !this.props.spin
        return (
           
              <Spinner config={spinCfg} stopped={!this.props.spin} />
            )
    }
}

// Function to export the state to redux
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(SpinnerCompo);