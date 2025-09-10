import cn from '@/utils/classNames';
import { RiCloseCircleFill, RiErrorWarningLine, RiSearchLine } from '@remixicon/react';
import { type VariantProps, cva } from 'class-variance-authority';
import { noop } from 'lodash-es';
import type { CSSProperties } from "react";
import React from 'react';

export const inputVariants = cva(
    '',
    {
        variants: {
            size: {
                regular: 'px-3',
                large: '',
            },
        },
        defaultVariants: {
            size: 'regular',
        },
    }
)

export type InputProps = {
    showLeftIcon?: boolean;
    showClearIcon?: boolean;
    onClear?: () => void;
    disabled?: boolean;
    destructive?: boolean;
    wrapperClassName?: string;
    styleCss?: CSSProperties;
    unit?: string;
    ref?: React.Ref<HTMLInputElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & VariantProps<typeof inputVariants>;

const Input = ({
    size,
    disabled,
    destructive,
    showLeftIcon,
    showClearIcon,
    onClear,
    wrapperClassName,
    className,
    styleCss,
    value,
    placeholder,
    onChange = noop,
    unit,
    ref,
    ...props
}: InputProps) => {
    return <div className={cn('relative w-full', wrapperClassName)}>
        {showLeftIcon && <RiSearchLine className={cn('absolute left-2 top-1/2 size-4 -translate-y-1/2 text-components-input-text-placeholder')} />}
        <input
            ref={ref}
            style={styleCss}
            className={cn(
                'w-full appearance-none border border-components-input-bg-normal py-[7px] text-components-input-text-filled caret-primary-600',
                inputVariants({ size }),
                showClearIcon && 'pl-[26px]',
                showLeftIcon && size === 'large' && 'pl-7',
                showClearIcon && value && 'pr-[26px]',
                showClearIcon && value && size === 'large' && 'pr-7',
                destructive && 'pr-[26px]',
                destructive && size === 'large' && 'pr-7',
                disabled && '',
                destructive && '',
                className
            )}
            placeholder={placeholder ?? showLeftIcon ? '搜索' : '请输入'}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
        />
        {showClearIcon && value && !disabled && !destructive && (
            <div>
                <RiCloseCircleFill />
            </div>
        )}
        {
            destructive && (
                <RiErrorWarningLine className='' />
            )
        }
        {
          unit && (
            <div className=''>
              {unit}
            </div>
          )
        }
    </div>;
}

Input.displayName = 'Input';

export default Input;