/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'
import main from './main'
import LoginList from './loginList'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
        main,
        LoginList
    ]
};

export default index;