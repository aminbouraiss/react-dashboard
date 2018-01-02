import getRatios from './groupby_ratios'
import {ratioList} from '../calculated metrics/ratiolist'
var d3 = require('d3')

// inner function passed to sum the dimensions by metrics
export function makeMetrics(metricList, obj) {
    var returnObj = {}
    metricList.map(metric => {
        returnObj[metric] = d3.sum(obj, function (g) {
            return g[metric];            
        })
        
    })
    return returnObj
}

// group by the metric at index 0 then index 1
export default function multiLevelNest(dims, metrics, data) {
    const nonratio = ratioList.indexOf(metrics[0]) === -1
    let grouped
    if (nonratio){
        grouped = d3
        .nest()
        .key(function (d) {
            return d[dims[0]];
        })
        .key(function (d) {
            return d[dims[1]];
        })
        .rollup(function (v) {
            return makeMetrics(metrics, v)
        })
        .object(data);

    } else{
        grouped = getRatios(dims,metrics,data)
    }
    
    return grouped
}

export function filterZero(metric, obj) {
    var keys = Object.keys(obj)
    var returnObj = {}
    var filtered = keys.map(function (key) {
        var tempObj = {}
        tempObj[key] = {}
        var innerObj = obj[key]
        var innerKeys = Object.keys(innerObj)
        var elemObj = innerKeys.map(function (innerkey) {
            var row = innerObj[innerkey]
            if (row[metric] > 0) {
                tempObj[key][innerkey] = row
            }
        })
        var keySize = Object.keys(tempObj[key]).length
        if (keySize > 0) {
            returnObj[key] = tempObj[key]
        }
    })
    return returnObj
}