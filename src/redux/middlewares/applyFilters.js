var d3 = require('d3')

export default function applyFilters({getState}) {
    return next => action => {
        let actionList = [
            'CHANGE_CHANNEL',
            'CHANGE_BRAND',
            'CHANGE_COUNTRY',
            'CHANGE_ADVERTISER',
            'CHANGE_WEBSITE',
            'CHANGE_TACTIC',
            'CHANGE_CURRENCY',
            'CHANGED_JSON'
        ]

        console.log('will dispatch', action)
        let filterCheck = actionList.indexOf(action.type)
        let previousState = getState().selectChannel

        // method in the middleware chain.
        let returnValue = next(action)
        // State after the dispatch
        let newState = getState().selectChannel

        if (filterCheck > -1) {
            let curData = getState().dfData
            let beforeData = getState().before_data
            let passedState = getState()
            let filtered = handleChange(curData, passedState)

            let newSum = getSum(filtered)
            let beforeFiltered = handleChange(beforeData, passedState)

            let beforeSum = getSum(beforeFiltered)
            let newData = {
                plotData: filtered,
                current_sum: newSum,
                previous_sum: beforeSum
            }
            returnValue = {
                type: 'CHANGE_PLOT_JSON',
                newData: newData
            }
            returnValue = next(returnValue)
        }

        // This will likely be the action itself, unless a middleware further in chain
        // changed it.
        return returnValue
    }
}

function handleChange(jsonObj, state) {
    if (state.selectChannel !== "All") {
        jsonObj = jsonObj.filter(function (row) {
            return row.Channel === state.selectChannel
        })
    }

    if (state.selectBrand !== "All") {
        jsonObj = jsonObj.filter(function (row) {
            return row.Brand === state.selectBrand
        })
    }

    if (state.selectAdvertiser !== "All") {
        jsonObj = jsonObj.filter(function (row) {
            return row.Advertiser === state.selectAdvertiser
        })
    }

    if (state.selectCountry !== "All") {
        jsonObj = jsonObj.filter(function (row) {
            return row.Country === state.selectCountry
        })
    }

    if (state.selectWebsite !== "All") {
        jsonObj = jsonObj.filter(function (row) {
            return row.Website === state.selectWebsite
        })
    }

    if (jsonObj.length == 0) {
        jsonObj = replace(state.dfData)
    }
    return jsonObj
}

export function getSum(objArray) {
    // Find the metrics
    var keys = Object.keys(objArray[0])
    var metrics = keys.filter(key => {
        return typeof(objArray[0][key]) != 'string'
    })

    // Sum the values for the metrics
    var metricObj = {}
    metrics.map(key => {
        let curArray = objArray.map(row => {
            return row[key]
        })
        let sum = d3.sum(curArray)
        let returnOb = {}
        metricObj[key] = sum
        // return returnOb
    })
    return metricObj
}

function replace(obj_Array) {
    let keys = Object.keys(obj_Array)
    let returnObj = {}
    keys.map(key => {
        obj_Array[0][key] = 0

    })
    return [returnObj]

}