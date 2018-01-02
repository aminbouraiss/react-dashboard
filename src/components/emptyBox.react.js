import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class emptyBox extends Component {
    render() {
        const {title, children, className, id} = this.props;
        let classValue
        if(!this.props.table){
            classValue = className ? className : "col-xs-12";
        } else {
            classValue = "col-xs-12"
        }
        let rowClass
        if (this.props.noCol) {
            rowClass = ""
        } else if(this.props.table){
            rowClass = "col table-responsive"
        } else {
            rowClass = "col"
        }

        return (
            <div className="row">
                <div className={classValue} id={id}>
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>{title}
                            </h2>
                            <ul
                                className="nav navbar-right panel_toolbox"
                                style={{minWidth: 0}}>
                                <li>
                                    <a className="collapse-link"><i className="fa fa-chevron-up"/></a>
                                </li>
                                <li>
                                    <a className="close-link"><i className="fa fa-close"/></a>
                                </li>
                            </ul>
                            <div className="clearfix"/>
                        </div>
                        <div className="x_content">
                            <div
                                className="row"
                                style={{
                                borderBottom: '1px solid #E0E0E0',
                                paddingBottom: 5,
                                marginBottom: 5
                            }}>
                                <div className={rowClass}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
