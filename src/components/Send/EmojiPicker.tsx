import React from 'react';
import Picker, {IEmojiPickerProps} from 'emoji-picker-react';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';

import {PopupMenu} from '../PopupMenu';

export const EmojiPicker = (props: IEmojiPickerProps) => {
    const {t} = useTranslation();

    return <PopupMenu buttonText={t('send:emoji')} identifier='emoji'>
        <MenuItem>
            <Picker {...props} />
        </MenuItem>
    </PopupMenu>;
};