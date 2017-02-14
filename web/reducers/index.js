/**
 * Created by dandan.wu on 16/9/13.
 */
import {routerReducer} from 'react-router-redux'
import {nestCombineReducers, handleActionsReducor} from '../utils/reducer-helper';
import * as demoPage from './demoPage'
import * as view from './view'
import * as loginList from './loginList'
import * as appList from './appList'

export const rootReducer = nestCombineReducers({
    routing:routerReducer,
    demoPage: {
        title: handleActionsReducor('origin title', demoPage.title)
    },
    view:{
        overLayList:handleActionsReducor([],view.overLayList)
    },
    loginList:{
        list:handleActionsReducor([],loginList.loginList),
        pageIndex:handleActionsReducor(0,loginList.loginListPageIndex),
        pageNum:handleActionsReducor(0,loginList.loginListPageNum)
    },
    appList:{
        list:handleActionsReducor([],appList.appList),
        userList:handleActionsReducor([],appList.userList)
    }
});

export default rootReducer;
