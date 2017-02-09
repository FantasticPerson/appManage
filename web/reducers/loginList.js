/**
 * Created by wdd on 2017/2/8.
 */
import * as ActionTypes from '../constants/ActionTypes';
import {actionPayloadReducer, nullReducer} from '../utils/reducer-helper';

export const loginList = {
    [ActionTypes.update_login_list]:actionPayloadReducer
};
export const loginListPageIndex={
    [ActionTypes.update_login_list_page_index]:actionPayloadReducer
};
export const loginListPageNum = {
    [ActionTypes.update_login_list_page_num]:actionPayloadReducer
};