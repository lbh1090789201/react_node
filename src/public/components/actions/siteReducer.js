function siteReducer(state = {value: 2}, action) {
    const value = state.value;
    let oldState = state;
    switch (action.type) {
        case 'increase':
            oldState["value"] = 6;
            return Object.assign({}, state, oldState);
        case 'reduce':
            oldState["value"] = action.value;
            return Object.assign({}, state, oldState);
        default:
            return Object.assign({}, state);
    }
}

export default siteReducer;