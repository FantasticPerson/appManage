/**
 * Created by dandan.wu on 16/9/13.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as overLayNames from '../constants/OverLayNames';

class App extends Component {
    renderOverLay(){
        const {overLayList} = this.props;
        return overLayList.map((item,index)=>{
            let cp = overLayNames.overLayMap[item.name];
            if(cp){
                return React.createElement(cp,{key:index,data:item.data,...this.props})
            } else {
                console.error('the overLay name ' + item.name + ' may be not defined');
            }
        });
    }
    render(){
        return (
            <div id="react-app">
                {this.renderOverLay()}
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        overLayList : state.view.overLayList
    }
}

export default connect(mapStateToProps)(App)