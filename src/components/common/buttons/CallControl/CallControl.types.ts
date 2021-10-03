import { HTMLAttributes } from 'react';

export interface CallControlProps extends HTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'large'
    color?: 'default' | 'red'
    disabled?: boolean
}