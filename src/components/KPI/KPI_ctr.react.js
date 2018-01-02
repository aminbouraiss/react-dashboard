import React, {Component} from 'react';
import numeral from 'numeral'
import {connect} from 'react-redux';
var d3 = require('d3')

class KPI_CTR extends Component {
  constructor(props) {
    super(props);
    // let metric = this.props.metric
    // let sumObj = this.props.current_sum
    // this.currentSum = sumObj[metric]
    }


  getValue(){
    var jsonObj = this.props.dfData
  }
    render() {
        const {className,topTitle,value,inverseColor} = this.props;
        let sumObj = this.props.current_sum
        let previous = this.props.previous_sum
        let clicks = sumObj.Clicks
        let impressions = sumObj.Impressions
        let previousClicks = previous.Clicks
        let previousImpressions = previous.Impressions 
        let CTR = (clicks/impressions) * 100
        let previousCTR = (previousClicks/previousImpressions) * 100

        let delta = CTR - previousCTR
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
        let CtrFormat = `${numeral(CTR).format('0,0.00')}%`


        return (
            <div className={size}>
                <span className><i className/>{topTitle}</span>
                <div className="count">{CtrFormat}</div>
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

export default connect(mapStateToProps)(KPI_CTR);
