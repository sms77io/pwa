import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {NavigationBaseButton} from './NavigationBaseButton';
import {calcDynamic, CalcDynamicOps} from '../../util/calcDynamic';

export type NavigationBaseProps = {
    index: number
    list: any[]
}

export type NavigationProps = NavigationBaseProps & {
    onNavigation: (i: number) => void
}

export const Navigation = ({index, list, onNavigation}: NavigationProps) => {
    const handleNavigation = (operator: keyof CalcDynamicOps): void => {
        let newIndex: number = calcDynamic(operator, index);

        if (!list[newIndex]) {
            newIndex = calcDynamic('+' === operator ? '-' : '+', newIndex);
        }

        onNavigation(newIndex);
    };

    return <>
        <NavigationBaseButton index={index} list={list}
                              IconButtonProps={{
                                  style: {left: '0px'},
                                  onClick: () => handleNavigation('-')
                              }}
                              Icon={ArrowLeftIcon} operator='-'/>


        <NavigationBaseButton index={index} list={list}
                              IconButtonProps={{
                                  style: {right: '0px'},
                                  onClick: () => handleNavigation('+')
                              }}
                              Icon={ArrowRightIcon} operator='+'/>
    </>;
};