/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ViewState from '../../constants/view';
import {showLoading,removeLoading} from '../../actions/view';
import {updateCurrentTitle} from '../../actions/demoPage'

class DemoPage extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading};
    }

    render(){
        return (
            <div>
                <div>
                    {'应用管理'}
                </div>
                <div>
                    <div>+</div>
                    <div>{'登记应用'}</div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        title: state.demoPage.title
    }
}

export default connect(mapStateToProps)(DemoPage);