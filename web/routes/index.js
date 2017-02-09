/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import deviceList from './deviceList'
import LoginList from './loginList'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        deviceList,
        LoginList
    ],
    indexRoute: {
        onEnter: (nextState, replace)=>replace('/loginList')//[/loginList || /deviceList]
    }
};

export default index;