import {dispatchCustomEvent} from './dispatchCustomEvent';

export const notify = async (message: string): Promise<boolean> => {
    const isGranted = () => 'granted' === Notification.permission;

    const create = () => new Notification(message);

    if (isGranted()) {
        create();
    } else {
        const permission = await Notification.requestPermission();

        if ('granted' === permission) {
            create();
        }
    }

    return dispatchCustomEvent('NOTIFY', {notification: {message}});
};