import React, {Component} from 'react';
import numeral from 'numeral'
import {connect} from 'react-redux';
var d3 = require('d3')

class KPI_CONVRATE extends Component {
  constructor(props) {
    super(props);
    }


  getValue(){
    var jsonObj = this.props.dfData
  }
  
    render() {
        const {className,topTitle,value,inverseColor} = this.props;
        let sumObj = this.props.current_sum
        let previous = this.props.previous_sum
        let clicks = sumObj.Clicks
        let transactions = sumObj.Transactions
        let previousClicks = previous.Clicks
        let previoustransactions = previous.Transactions 
        let convRate = (transactions/clicks) * 100
        let previousconvRate = (previoustransactions/previousClicks) * 100

        let delta = convRate - previousconvRate
        let trend
        if (delta > 0) {
            trend = 'up'

        } else if (delta < 0){
            trend = 'down'

        } else {
            trend = "flat"
        }

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

        let deltaFormat = `${numeral(delta).format('0,0.00')}%`
        let convRateFormat = `${numeral(convRate).format('0,0.00')}%`


        return (
            <div className={size}>
                <span className><i className/>{topTitle}</span>
                <div className="count">{convRateFormat}</div>
                <span className="count_bottom">
                    <i className={color}><i className={trendIcon}/>{deltaFormat} </i>&nbsp;From previous period</span>
            </div>
        );
    }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(KPI_CONVRATE);
