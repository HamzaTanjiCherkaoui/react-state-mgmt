const NAVIGATE = '__NAVIGATE__';

export function createRoutingMiddleware(history) {
    return store => next => action => {
        if (action.type === NAVIGATE) {
            history.push(action.payload);
        } else {
            next(action);
        }
    };
}

export function routingAction(path) {
    return {
        type: NAVIGATE,
        payload: path
    };
}
