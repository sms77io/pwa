export default (state: string = '', action: any) => {
    switch (action.type) {
        case 'SET_TO':
            state = action.to;

            return state;
        default:
            return state;
    }
};