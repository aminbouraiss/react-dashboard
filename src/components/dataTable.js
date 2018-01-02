import React, {Component} from 'react';
import {connect} from 'react-redux';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import EmptyBox from './emptyBox.react'
import groupby, {formatNumber} from '../helper_functions/d3_groupby'

class DataTable extends Component {

    makeClass(classStr = 'table') {
        const styleObj = {
            classNames: {
                Table: classStr
            }
        }
        return styleObj
    }

    NewLayout({Table, Pagination, Filter, SettingsWrapper}) {
        return (
            <div>
                <Filter/>
                <div style={{paddingTop: 8}}></div>
                <Table/>
                <Pagination/>
            </div>
        )
    }

    makeCol(dims, metrics) {
        let dimcols = dims.map(dim => {
            return <ColumnDefinition id={dim}/>
        })
        let metricCols = metrics.map(metric => {
            let CustomColumn = ({value}) => <span>{formatNumber(value, metric)}</span>;
            return <ColumnDefinition id={metric} customComponent={CustomColumn}/>

        })
        return dimcols.concat(metricCols)
    }

    render() {
        const {id, title,metrics, dims, className, plotData,fixedHeight,boxClass} = this.props;
        let class_Name = className ? className : "table table-striped jambo_table bulk_action";
        let box_Class = boxClass ? boxClass : ""
        let height = fixedHeight ? fixedHeight : "No"
        let customCols = this.makeCol(dims, metrics)
        let data = groupby(dims, metrics, plotData)        
        return (
            <EmptyBox id={id} title={title} className={box_Class} fixedHeight={height} table={this.props.table}>
            <Griddle
                data={data}
                className={className}
                styleConfig={this.makeClass(class_Name)}
                plugins={[plugins.LocalPlugin]}
                components={{
                Layout: this.NewLayout
            }}>
                <RowDefinition>
                    {customCols}
                </RowDefinition>
            </Griddle>
            </EmptyBox>
        );
    }
}

// Return the whole state
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(DataTable);
