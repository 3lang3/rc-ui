import * as React from 'react';
import cls from 'classnames';
import { createNamespace } from '../utils';
import './index.less';

export type RowAlign = 'top' | 'center' | 'bottom';

export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

type RowProps = {
  type?: 'flex';
  gutter?: number | string;
  justify?: RowJustify;
  align?: RowAlign;
} & React.HTMLAttributes<HTMLDivElement>;

const [name, bem] = createNamespace('flex');

const Flex = ({ className, type, gutter, justify, align, ...props }: RowProps) => {
  return (
    <div
      className={cls(
        className,
        bem({ [`align-${align}`]: align, [`justify-${justify}`]: justify }),
      )}
      {...props}
    />
  );
};

Flex.displayName = name;

export default Flex;
