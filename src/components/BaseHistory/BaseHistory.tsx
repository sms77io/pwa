import React, {useEffect, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import {ILocalStore, LocalStore} from '../../util/LocalStore';
import {usePrevious} from '../../util/usePrevious';
import {Navigation} from './Navigation';

export type BaseHistoryProps = {
    onNavigation?: (isCurrent: boolean) => void
    path?: string
    rowHandler: (row: any, i: number) => any
    storeKey: keyof ILocalStore
}

export const BaseHistory = ({onNavigation, path, rowHandler, storeKey}: BaseHistoryProps) => {
    const [list, setList] = useState<any[]>([]);
    const previousList = usePrevious<any>(list);
    const [index, setIndex] = useState<number>(-1);
    const entry = -1 === index ? null : list[index];

    useEffect(() => {
        LocalStore.get(storeKey).then((list) => {
            if (Array.isArray(list)) {
                setList(list);

                if (previousList && previousList.length !== list.length) {
                    setIndex(list.length - 1);
                }
            }
        });
    }, [list, storeKey]);

    const getTableBody = () => {
        if (!entry) {
            return null;
        }

        let values;

        if (path) {
            values = entry;

            for (const key of path.split('.')) {
                values = values[key];
            }
        } else {
            values = [entry].flat();
        }

        return values.map(rowHandler);
    };

    return <>
        {entry && <Navigation index={index} list={list} onNavigation={(n) => {
            setIndex(n);

            const isCurrent = n + 1 === list.length;

            onNavigation && onNavigation(isCurrent);
        }}/>}

        <TableContainer>
            <Table size='small'>
                <TableBody>
                    {getTableBody()}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
};