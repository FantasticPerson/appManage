/**
 * Created by dandan.wu on 16/9/13.
 */
import {routerReducer} from 'react-router-redux'
import {nestCombineReducers, handleActionsReducor} from '../utils/reducer-helper';
import * as demoPage from './demoPage'
import * as view from './view'

export const rootReducer = nestCombineReducers({
    routing:routerReducer,
    demoPage: {
        title: handleActionsReducor('origin title', demoPage.title)
    },
    view:{
        overLayList:handleActionsReducor([],view.overLayList)
    }
});

export default rootReducer;
