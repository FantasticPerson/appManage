/**
 * Created by dandan.wu on 16/9/21.
 */
import Main from '../containers/appList/index'

const deviceList = {
    path: 'appList',
    component: Main,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("demoPage leave");
    }
};

export default deviceList;