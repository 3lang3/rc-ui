import * as React from 'react';
import cls from 'classnames';
import './index.less';
import { createNamespace } from 'src/utils';

type FlexProps = {
  align?: 'center' | 'baseline' | 'start' | 'end' | 'stretch';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  direction?: 'column' | 'row';
} & React.HTMLAttributes<HTMLDivElement>;

const [name] = createNamespace('flex');

const Flex = ({
  align = 'center',
  justify = 'start',
  wrap = 'nowrap',
  direction = 'row',
  children,
  className,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cls(
        'flex',
        `flex-align-${align}`,
        `flex-justify-${justify}`,
        {
          'flex-wrap': wrap === 'wrap',
          'flex-column': direction === 'column',
        },
        className,
      )}
      {...props}
    />
  );
};

Flex.displayName = name;

export default Flex;
