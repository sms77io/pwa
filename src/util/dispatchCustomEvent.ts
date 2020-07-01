const pkg = require('../../package.json');

const controllerKey = 'action';

type Sms77CustomEventData = {
    [key: string]: any
} & { [controllerKey]?: never };

export const dispatchCustomEvent = (action: string, data: Sms77CustomEventData = {}): boolean => {
    const customEvent = new CustomEvent(pkg.sms77.name, {
        detail: {...data, [controllerKey]: action}
    });

    return window.dispatchEvent(customEvent);
};