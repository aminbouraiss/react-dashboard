import React, {Component} from 'react';
import {connect} from 'react-redux';
import EmptyBox from './emptyBox.react'
import Table from './dataTable'
import KPI from './KPI/KPI.react'
import KPI_CTR from './KPI/KPI_ctr.react'
import KPI_ROAS from './KPI/KPI_roas.react'
import KPI_CPM from './KPI/KPI_cpm.react'
import KPI_CPC from './KPI/KPI_cpc.react'
import KPI_convRate from './KPI/KPI_convRate'
import KPI_AOS from './KPI/KPI_aos.react'
import PredefinedRanges from './daterange';
import ChannelSelect from './topSelectors';
import Plot from './Plot';
import TimeSeries from './TimeSeries.react';
import MultiPlot from './MultiPlot';
import SpinnerCompo from './Spinner'

class Content extends Component {
  render() {
    const {children} = this.props;

    return (
      <div>
        {/* KPI bar */}
        <div className="row tile_count" id="scorecards1">
          <KPI topTitle="Sessions" metric="Sessions"/>
          <KPI topTitle="New Users" metric="New Users"/>
          <KPI topTitle="Revenue (USD)" metric="Revenue (USD)"/>
          <KPI topTitle="Clicks" metric="Clicks"/>
          <div>
            <KPI topTitle="Impressions" metric="Impressions"/>
            <KPI_CTR topTitle="CTR"/>
            <KPI_convRate topTitle="Conversion Rate"/>
            <KPI_CPC topTitle="CPC"/>
          </div>
          <div>
            <KPI_CPM topTitle="CPM"/>
            <KPI_ROAS topTitle="ROAS (USD)"/>
            <KPI_AOS topTitle="AOS (USD)"/>
          </div>
        </div>
        {/* Controls */}
        <EmptyBox title="Filters" className="col-sm-12" fixedHeight="No" noCol={true}>
          <div className="row">
          <PredefinedRanges/>
          <ChannelSelect filter="Channel" label="Channel"/>
          <ChannelSelect filter="Brand" label="Brand"/>
          <ChannelSelect filter="Country" label="Country"/>
          <ChannelSelect filter="Advertiser" label="Advertiser"/>
          </div>
          <div className="row" style={{marginBottom:10}}>
          <ChannelSelect filter="Website"
          label="Website"
          labelStyle={{marginTop:10}}
          selectStyle={{marginBottom:10}}
          />
          </div>
        </EmptyBox>
        <SpinnerCompo/>
        {/* Controls */}
        <br/>
        <div className="row">
          <Plot
            title="Clicks per Website"
            metric="Clicks"
            dimension="Website"
            id="plot1"
            color="#fa9fb5"
            />
          <Plot
            title="Impressions per Tactic"
            metric="Impressions"
            dimension="Tactic"
            id="plot2"
            color='#31a354'/>
            <MultiPlot
            title="ROAS by Website / Channel"
            metric={['ROAS']}
            dimension={['Channel','Website']}
            id="plot7"
            />
            <MultiPlot
            title="Conversion Rate by Website / Channel"
            metric={['Conv Rate']}
            dimension={['Channel','Website']}
            id="plot8"
            />
          <TimeSeries
            title="CTR / Conv Rate By Date"
            colors = {['#5843B2','#09B20A']}
            traces={[{
              metric: 'CTR',
              dimension: 'Date',
              name: 'CTR'
            },
            {
              metric: 'Conv Rate',
              dimension: 'Date',
              name:'Conversion Rate'
            }
          ]}
            id="plot3"/>
            <TimeSeries
            title="ROAS By Date"
            traces={[{
              metric: 'ROAS',
              dimension: 'Date',
              name: 'ROAS'
            }
          ]}
            id="plot4"/>
        </div>
        <div className="row">
          <Table
            id="first_table"
            title="Performance by country"
            dims={['Country']}
            metrics={[
            'Impressions',
            'Clicks',
            'Revenue (Local)',
            'Revenue (USD)',
            'CTR',
            'Media Cost (USD)',
            'Sessions'
          ]}
          table={true}
          />
          <Table
            title="Performance by Website"
            dims={['Website']}
            metrics={[
            'Impressions',
            'Clicks',
            'Revenue (USD)',
            'ROAS',
            'CTR',
            'CPC',
            'CPM',
            'CPM',
            'Conv Rate',
            'Conv Rate',
            'Media Cost (USD)',
            'Sessions'
          ]}
          table={true}
          />
        </div>
      </div>
    );
  }
}

// Function to export the state to redux
function mapStateToProps(state) {
  return state;
}

// export default connect(mapStateToProps)(App);
export default connect(mapStateToProps)(Content);
