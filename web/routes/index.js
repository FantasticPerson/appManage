/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import appList from './appList'
import LoginList from './loginList'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        appList,
        LoginList
    ],
    indexRoute: {
        onEnter: (nextState, replace)=>replace('/appList')//[/loginList || /appList]
    }
};

export default index;