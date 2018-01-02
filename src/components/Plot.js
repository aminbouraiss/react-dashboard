/* global Plotly */

import React from 'react';
import {connect} from 'react-redux';
import {filterZero} from '../helper_functions/d3_groupby'
import {formatNumber} from '../helper_functions/d3_groupby'
var d3 = require('d3')

class Plot extends React.Component {

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
        let metric = this.props.metric
        let dimension = this.props.dimension
        let zeroValues = this.props.zeroValues
        let data = this.props.plotData
        // remove the zero values if specified
        if(!zeroValues){
            data = filterZero(metric,this.props.plotData)
        }
        // group by the metric
        let grouped = d3
            .nest()
            .key(function (d) {
                return [d[dimension]];
            })
            .rollup(function (d) {
                return {
                    metrics: d3.sum(d, function (g) {
                        return g[metric];
                    })
                }
            })            
            .entries(data);

        // Extract the x and y values
        let x = grouped.map(function (obj) {
            let dimSplit = obj.key
            return dimSplit
        })

        let y = grouped.map(function (obj) {
            let metricSplit = obj.value.metrics
            return metricSplit
        })

        let trace1 = {
            x: x,
            y: y,
            name: 'Clicks per website',
            type: 'bar',
            hoverinfo: 'text',
            text: y.map(value => formatNumber(value, metric[0])),
            marker:{color:this.props.color}
        };

        let traces = [trace1];
        let layout = {
            barmode: 'stack'
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
            this.setState({className: "col-xs-12", sizeIcon: "fa fa-compress"})
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
                                <a
                                    className="dropdown-toggle"
                                    role="button"
                                    aria-expanded="false"><i className={this.state.sizeIcon} onClick={this.toggleSize}/></a>
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

// Function to export the state to redux
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Plot);