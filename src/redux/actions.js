import xhr from 'xhr';

export function changeJson(dfData) {
    return {
        type: 'CHANGE_JSON',
        dfData: dfData
    };
}

export function changeSpin(spinValue) {
  return {
      type: 'CHANGE_SPIN',
      spin: spinValue
  };
}

export function changedJson() {
  return {
      type: 'CHANGED_JSON',
  };
}

export function changePlotJson(plotData) {
  return {
      type: 'CHANGE_PLOT_JSON',
      plotData: plotData
  };
}

export function changeSum(obj) {
  return {
      type: 'CHANGE_SUM',
      currentSum: obj
  };
}

export function changePreviousData(obj) {
  return {
      type: 'CHANGE_PREVIOUS_DATA',
      before_data: obj
  };
}

export function changeDates(dateObj) {
  return {
      type: 'CHANGE_DATES',
      dateObj: dateObj
  };
}

export function channelChange(channel) {
  return {
      type: 'CHANGE_CHANNEL',
      channel: channel
  };
}

export function brandChange(brand) {
  return {
      type: 'CHANGE_BRAND',
      brand: brand
  };
}

export function countryChange(country) {
  return {
      type: 'CHANGE_COUNTRY',
      country: country
  };
}

export function advertiserChange(advertiser) {
  return {
      type: 'CHANGE_ADVERTISER',
      advertiser: advertiser
  };
}

export function tacticChange(tactic) {
  return {
      type: 'CHANGE_TACTIC',
      tactic: tactic
  };
}

export function currencyChange(currency) {
  return {
      type: 'CHANGE_CURRENCY',
      currency: currency
  };
}

export function websiteChange(website) {
  return {
      type: 'CHANGE_WEBSITE',
      website: website
  };
}



  // PASS URL IN HERE
export function fetchData(url) {
    return function thunk(dispatch) {
      xhr({
        url: url
      }, function (err, data) {
  console.log('fetchData')
        var body = JSON.parse(data.body);
        var data = body.data
        var currentSum = body.currentSum
        var previousSum = body.beforeSum
        var before_data = body.beforeData

        dispatch(changeJson(data));        
        dispatch(changeSum(currentSum));
        dispatch(changePreviousData(before_data));        
        dispatch(changedJson())
        dispatch(changeSpin(false))
        
      });
    }
  }
  