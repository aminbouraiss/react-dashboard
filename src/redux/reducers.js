import moment from 'moment';
import {getSum} from './middlewares/applyFilters';
var d3 = require('d3')

//Initialize the app with sample data
var jsonFile = require('../components/data/initial_data.json')
var body = JSON.parse(jsonFile)
var data = body.data
var beforeData = body.beforeData
var currentSum = body.currentSum
var maxDate = d3.max(data,function(d){return d.Date})

// The initial state object
var initialState = {
    dfData: data,
    plotData:data,
    spin:false,
    current_sum: currentSum,
    kpiSum:currentSum,
    before_data:beforeData,
    previous_sum: getSum(beforeData),
    selectChannel: 'All',
    selectBrand: 'All',
    selectTactic: 'All',
    selectAdvertiser: 'All',
    selectCountry: 'All',
    selectCurrency: 'All',
    selectWebsite: 'All',
    startDate: moment(maxDate).subtract(14  , 'days'),
    endDate: moment(maxDate),
    ranges: {
        'Today': [
            moment(), moment()
        ],
        'Yesterday': [
            moment().subtract(1, 'days'),
            moment().subtract(1, 'days')
        ],
        'Last 7 Days': [
            moment().subtract(6, 'days'),
            moment()
        ],
        'Last 30 Days': [
            moment().subtract(29, 'days'),
            moment()
        ],
        'This Month': [
            moment().startOf('month'),
            moment().endOf('month')
        ],
        'Last Month': [
            moment()
                .subtract(1, 'month')
                .startOf('month'),
            moment()
                .subtract(1, 'month')
                .endOf('month')
        ]
    }
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_JSON':
            return Object.assign({}, state, {dfData: action.dfData});
        case 'CHANGE_SPIN':
            return Object.assign({}, state, {spin: action.spin});
        case 'CHANGE_PLOT_JSON':
        console.log('changing plot')
            return Object.assign({}, state, {
                plotData: action.newData.plotData,
                current_sum: action.newData.current_sum,
                previous_sum: action.newData.previous_sum
            });
        case 'CHANGE_SUM':
            return Object.assign({}, state, {current_sum: action.currentSum});
        case 'CHANGE_PREVIOUS_SUM':
            return Object.assign({}, state, {previous_sum: action.previousSum});
        case 'CHANGE_PREVIOUS_DATA':
            return Object.assign({}, state, {before_data: action.before_data});
        case 'CHANGE_DATES':
            return Object.assign({}, state, {
                startDate: action.dateObj.startDate,
                endDate: action.dateObj.endDate
            });
        case 'CHANGE_CHANNEL':
            return Object.assign({}, state, {selectChannel: action.channel});
        case 'CHANGE_BRAND':
            return Object.assign({}, state, {selectBrand: action.brand});
        case 'CHANGE_COUNTRY':
            return Object.assign({}, state, {selectCountry: action.country});
        case 'CHANGE_ADVERTISER':
            return Object.assign({}, state, {selectAdvertiser: action.advertiser});
        case 'CHANGE_CURRENCY':
            return Object.assign({}, state, {selectCurrency: action.currency});
        case 'CHANGE_WEBSITE':
            return Object.assign({}, state, {selectWebsite: action.website});
        default:
            return state;
    }
}
