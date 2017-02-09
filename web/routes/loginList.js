/**
 * Created by dandan.wu on 16/9/21.
 */
import Main from '../containers/LoginList/index'

const LoginListPage = {
    path: 'loginList',
    component: Main,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
    }
};

export default LoginListPage;