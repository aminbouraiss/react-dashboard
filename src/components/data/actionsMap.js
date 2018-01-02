import {
    channelChange,
    brandChange,
    countryChange,
    advertiserChange,
    tacticChange,
    currencyChange,
    websiteChange
} from '../../redux/actions';

const actionsMap = {
    Channel: channelChange,
    Brand: brandChange,
    Country: countryChange,
    Advertiser: advertiserChange,
    Tactic: tacticChange,
    Currency: currencyChange,
    Website: websiteChange
}

export default actionsMap