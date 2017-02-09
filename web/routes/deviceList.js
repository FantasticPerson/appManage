/**
 * Created by dandan.wu on 16/9/21.
 */
import Main from '../containers/deviceList/index'

const deviceList = {
    path: 'deviceList',
    component: Main,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("demoPage leave");
    }
};

export default deviceList;