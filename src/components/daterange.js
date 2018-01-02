import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {changeDates, changeSpin, fetchData} from '../redux/actions';

class PredefinedRanges extends React.Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }

    dateToString(dateObj) {
        return dateObj.format("YYYY-MM-DD");
    }

    handleEvent(event, picker) {
        const dateObj = {
            startDate: picker.startDate,
            endDate: picker.endDate
        }
        var startSpin = {spin:true}
        this.props.dispatch(changeDates(dateObj));
        this.props.dispatch(changeSpin({spin:true}));
        console.log(picker.startDate)
        let dateToString = this.dateToString
        let start = dateToString(this.props.startDate)
        let end = dateToString(this.props.endDate)
        var baseUrl = `${window.xhrUrl}/chart`        
        var url = `${baseUrl}?startDate=${start}&endDate=${end}`
        console.log(url)
        this.props.dispatch(fetchData(url));
    }

    render() {
        console.log('Dategrange rendered')
        let start = this.props.startDate.format('MMMM D, YYYY');
        let end = this.props.endDate.format('MMMM D, YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        return (
            <div>
                <div className="col-md-4 tile">
                <div>
                <label class="control-label">Date Range</label>
                    <DatetimeRangePicker
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        ranges={this.props.ranges}
                        onApply={this.handleEvent}>
                        <div className="input-group" style={{marginBottom:0}}>
                            <input type="text" className="form-control" value={label}/>
                            <span className="input-group-btn">
                                <Button className="default date-range-toggle">
                                    <i className="fa fa-calendar"/>
                                </Button>
                            </span>
                        </div>
                    </DatetimeRangePicker>
                    </div>
                </div>
            </div>
        );
    }

}

// Function to export the state to redux
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(PredefinedRanges);
