import { HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    design?: 'white' | 'gold'
    textColor?: 'green' | 'gold'
    disabled?: boolean
}