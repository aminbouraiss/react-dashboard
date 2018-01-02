import {currencyList,ratioList,ratioObj} from '../calculated metrics/ratiolist'
import {makeMetrics} from './multilevel_groupBy'
var d3 = require('d3')

const ratiolist = Object.keys(ratioObj)

function groupby_Ratios(dimList, metricArray, dataObj) {
    let requiredList = []
    let ratios = []
    //check if the metric list contains ratios
    let metricList = metricArray.slice(0)
    let checkRatio = metric => ratiolist.indexOf(metric) !== -1
    metricList.map(metric => {
        if (checkRatio(metric)) {
            // list the required dimensions for calculations
            ratios.push(metric)
            let required = ratioObj[metric].required
            required.map(measure => {
                if (metricList.indexOf(measure == -1)) {
                    requiredList.push(measure)
                }
            })
            // Temporarily remove the ratio from the metric list
            metricList.splice(metricList.indexOf(metric), 1)
        }
    })
    // add the required metrics
    metricList = metricList.concat(requiredList)
    // The actual function to perform the groupBy
    let groupedDf = d3
        .nest()
        .key(function (d) {
            return dimList.map(key => d[key]);
        })
        .rollup(function (d) {
            return makeMetrics(metricList, d)
        })
        .entries(dataObj);

    let flattened = groupedDf.map(elem => {
        var rowObj = {}
        let dimSplit = elem
            .key
            .split(',')
        dimList.map((dim, index) => {
            rowObj[dim] = dimSplit[index]
        });
        metricList.map((metric, index) => rowObj[metric] = elem.value[metric])
        return rowObj
    })
    // add the ratios
    if (ratios.length > 0) {
        flattened = flattened.map(row => {
            ratios.map(ratio => {
                let formula = ratioObj[ratio].formula(row)
                row[ratio] = isFinite(formula) && formula || 0;
            })
            return row
        })
    }

    return flattened
}

export default function getRatios(dimensionList, metricList, data) {
    // group the values and calculate the ratio
    var grouped = groupby_Ratios(dimensionList, metricList, data)
    //format the data for further processing
    var formated = d3
        .nest()
        .key(function (d) {
            return d[dimensionList[0]];
        })
        .key(function (d) {
            return d[dimensionList[1]];
        })
        .rollup(function (v) {
            var tempObj = {};
            tempObj[metricList[0]] = v[0][metricList[0]]
            return tempObj
        })
        .object(grouped);
    return formated
}
