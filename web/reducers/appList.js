/**
 * Created by wdd on 2017/2/14.
 */
import * as ActionTypes from '../constants/ActionTypes';
import {actionPayloadReducer, nullReducer} from '../utils/reducer-helper';

export const appList = {
    [ActionTypes.update_app_list]:actionPayloadReducer
};

export const userList = {
    [ActionTypes.update_user_list]:actionPayloadReducer
};