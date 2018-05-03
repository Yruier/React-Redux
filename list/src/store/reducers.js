import { combineReducers } from 'redux';

const GET_LIST = 'GET_LIST';
const ADD_TASK = 'ADD_TASK';
const DELETE_ITEM = 'DELETE_ITEM';
const TOGGLE_CHECKED = 'TOGGLE_CHECKED';

const initState = {
    list: []
}

const List = (state = initState.list, action) => {
    switch (action.type) {
        case GET_LIST:
            return [...action.payload];
        case ADD_TASK:
            return [...action.payload];
        case TOGGLE_CHECKED:
            return [...action.payload];
        case DELETE_ITEM:
            return [...action.payload];
        default:
            return state;
    }
}

export default combineReducers({
    List
})