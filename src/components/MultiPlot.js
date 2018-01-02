/* global Plotly */

import React from 'react';
import {connect} from 'react-redux';
import {formatNumber} from '../helper_functions/d3_groupby'
import multiLevelNest, {filterZero} from '../helper_functions/multilevel_groupBy'

var d3 = require('d3')

class MultiPlot extends React.Component {

    constructor(props) {
        super(props);
        let curId = this.props.id
        this.id = curId ? curId : 'plot'
        this.classValue = this.props.className
        this.state = {
            className: this.classValue ? this.classValue : "col-md-6 col-xs-12",
            sizeIcon: "fa fa-expand"
        }
        // This binding is necessary to make `this` work in the callback
        this.toggleSize = this.toggleSize.bind(this);
    }

    makeChart() {
        const metric = this.props.metric
        const dimension = this.props.dimension
        let plotData = this.props.plotData
        let zeroValues = this.props.zeroValues

        // group by the dimensions and metrics
        let data = multiLevelNest(dimension, metric, plotData)

        // remove the zero values if specified
        if (!zeroValues) {            
            data = filterZero(metric[0], data)
        }

        // Extract the x and y values
        let keys = Object.keys(data)

        let traces = keys.map(key => {
            let curObj = data[key]
            let xVals = Object.keys(curObj)
            let x = xVals

            let y = x.map(key => {
                return curObj[key][metric[0]]
            })

            let trace = {
                x: x,
                y: y,
                name: key,
                type: 'bar',
                hoverinfo: 'text',
                text: y.map(value => formatNumber(value, metric[0])),
                marker: {
                    color: this.props.color
                }
            };
            return trace
        })
        let layout = {
            barmode: 'group'
        };
        Plotly.newPlot(this.props.id, traces, layout, {displaylogo: false})
        
    }

    componentDidMount() {
        this.makeChart();
    }

    componentDidUpdate() {
        this.makeChart();
    }

    toggleSize() {
        if (this.state.sizeIcon == "fa fa-expand") {
            this.setState({className: "col-md-12", sizeIcon: "fa fa-compress"})
        } else {
            this.setState({
                className: this.classValue
                    ? this.classValue
                    : "col-md-6 col-xs-12",
                sizeIcon: "fa fa-expand"
            })
        }
    }

    render() {
        console.log('Plot rendered')
        return (
            <div className={this.state.className}>
                <div className="x_panel">
                    <div className="x_title">
                        <h2
                            style={{
                            overflow: "visible"
                        }}>{this.props.title}
                        </h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li>
                                <a className="collapse-link"><i className="fa fa-chevron-up"/></a>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" role="button" aria-expanded="false"><i className={this.state.sizeIcon} onClick={this.toggleSize}/></a>
                            </li>
                            <li>
                                <a className="close-link"><i className="fa fa-close"/></a>
                            </li>
                        </ul>
                        <div className="clearfix"/>
                    </div>
                    <div className="x_content">
                        <div
                            className="row"
                            style={{
                            borderBottom: '1px solid #E0E0E0',
                            paddingBottom: 5,
                            marginBottom: 5
                        }}>
                            <div className="col">
                                <div id={this.props.id}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

// // Function to export the state to redux
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(MultiPlot);