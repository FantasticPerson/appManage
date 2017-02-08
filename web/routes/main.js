/**
 * Created by dandan.wu on 16/9/21.
 */
import Main from '../containers/main/index'

const demoPage = {
    path: 'main',
    component: Main,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("demoPage leave");
    }
};

export default demoPage;