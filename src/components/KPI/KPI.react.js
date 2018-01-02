import React, {Component} from 'react';
import numeral from 'numeral'
import {connect} from 'react-redux';
var d3 = require('d3')

class KPI extends Component {

  getValue(){
    var jsonObj = this.props.dfData
  }

  formatOutput(value,currencyCheck){
    let formatedCount
    if (currencyCheck) {
        formatedCount = numeral(value).format('0,0')
    } else {
        formatedCount = numeral(value).format('$0,0')
    }
    return formatedCount
  }

    render() {
        const {className,topTitle,value,inverseColor} = this.props;
        let metric = this.props.metric
        let sumObj = this.props.current_sum
        let previous = this.props.previous_sum
        this.currentSum = sumObj[metric]
        let previousSum = previous[metric]
        let delta = this.currentSum - previousSum
        var currencyList = ['Commissions (USD)','Media Cost (USD)','Revenue (USD)','Sales (USD)']
        var currencyCheck = currencyList.indexOf(metric) == -1
        
        let formatedCount = this.formatOutput(this.currentSum,currencyCheck)

        let trend
        if (delta > 0) {
            trend = 'up'

        } else if (delta < 0){
            trend = 'down'

        } else {
            trend = "flat"
        }

        let formatDelta = this.formatOutput(delta,currencyCheck)
        const size = className ? className : "col-md-3 col-sm-4 col-xs-6 tile_stats_count"

        if (trend === "up") {
            var color = inverseColor ? "red" : "green"
            var trendIcon = "fa fa-sort-asc"
        } else if (trend === "down") {
            var color = inverseColor ? "green" : 'red'
            var trendIcon = "fa fa-sort-desc"
        } else {
            var color = "green"
            var trendIcon = "fa fa-sort"
        }
                
        return (
            <div className={size}>
                <span className><i className/>{topTitle}</span>
                <div className="count">{formatedCount}</div>
                <span className="count_bottom">
                    <i className={color}><i className={trendIcon}/>{formatDelta} </i>&nbsp;From previous period</span>
            </div>
        );
    }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(KPI);
