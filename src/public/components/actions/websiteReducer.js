function websiteReducer(state = {count: 0}, action) {
    let oldState = state;
    let count = null;
    switch (action.type) {
        case 'websites_increase':
            count = state.count;
            oldState["count"] = count + 1;
            return Object.assign({}, state, oldState);
        case 'websites_reduce':
            count = state.count;
            oldState = action.data;
            return Object.assign({}, state, oldState);
        default:
            return Object.assign({}, state);
    }
}

export function onReduceClick(type, data) {
    console.log(type, data, "测试")
    return type;
};
export default websiteReducer;