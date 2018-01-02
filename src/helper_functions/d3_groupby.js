import numeral from 'numeral'
var d3 = require('d3')


var currencyList = ['Commissions (USD)','Media Cost (USD)',
'Revenue (USD)','Sales (USD)','ROAS','CPM','CPC']
var ratioList = ['CTR','ROAS','CPM','CPC','Conv Rate']
var ratioObj = {
    CTR: {
        required: ['Impressions','Clicks'],
        formula: (row) => (row.Clicks /row.Impressions) * 100
    },
    ROAS: {
        required: ['Revenue (USD)','Media Cost (USD)'],
        formula: (row) => (row['Revenue (USD)'] /row['Media Cost (USD)'])
    },
    CPM: {
        required: ['Impressions','Media Cost (USD)'],
        formula: (row) => (row['Media Cost (USD)'] /row.Impressions) * 1000
    },
    CPC: {
        required: ['Clicks','Media Cost (USD)'],
        formula: (row) => (row['Media Cost (USD)'] /row.Clicks )
    },
    'Conv Rate': {
        required: ['Transactions','Clicks'],
        formula: (row) => (row.Transactions/row.Clicks) * 100
    }

}

var ratiolist = Object.keys(ratioObj)
var requiredList = []
var ratios = []

export default function groupby(dimList, metricList,dataObj) {
    //check if the metric list contains ratios
    let checkRatio = metric => ratiolist.indexOf(metric) !== -1
    metricList.map(metric=>{
        if (checkRatio(metric)) {
            // list the required dimensions for calculations
            ratios.push(metric)
            let required = ratioObj[metric].required
            required.map(measure=>{
                if (metricList.indexOf(measure == -1)){
                    requiredList.push(measure)
                }
            })
            // Temporarily remove the ratio from the metric list
            metricList.splice(metricList.indexOf(metric),1)

        }
    })
    // inner function passed to sum the dimensions by metrics
    var makeMetrics = (metricList, obj) => {
        let returnObj = {}
        metricList.map(metric => {
            returnObj[metric] = d3.sum(obj, function (g) {
                return g[metric];
            })
        })
        return returnObj
    }

// add the required metrics
metricList = metricList.concat(requiredList)
    // The actual function to perform the groupBy
    var groupedDf = d3.nest().key(function (d) {
            return dimList.map(key => d[key]);
        })
        .rollup(function (d) {
            return makeMetrics(metricList, d)
        })
        .entries(dataObj);

    var flattened = groupedDf.map(elem => {
        var rowObj = {}
        let dimSplit = elem.key.split(',')
        dimList.map((dim, index) => {
            rowObj[dim] = dimSplit[index]
        });
        metricList.map((metric, index) => rowObj[metric] = elem.value[metric])
        return rowObj
    })
    // add the ratios
    if (ratios.length > 0) {
        flattened = flattened.map(row=>{
            ratios.map(ratio=>{
                let formula = ratioObj[ratio].formula(row)
                row[ratio] = getFinite(formula)
            })
           return row 
        })
    }
    return flattened
}

export function formatNumber(number=0,name){
    var value
    if (currencyList.indexOf(name) != -1) {
        value = numeral(number).format('$0,0.00')
        
    } else if (ratioList.indexOf(name)!= -1){
        value = numeral(number).format('0,0.00')
          value = `${value}%`

    }
    else {
        value = numeral(number).format('0,0')
    }
    
    return value

  }

  function getFinite(variable){
    const theResult = isFinite(variable) && variable || 0;
    return theResult

  }

 export function filterZero(metric, obj) {
    var filtered = obj.filter(function(row){return row[metric] > 0})
    return filtered 
}
