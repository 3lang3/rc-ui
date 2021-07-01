import * as React from 'react';
import cls from 'classnames';
import { createNamespace } from '../utils';
import './index.less';

type ColProps = {
  span?: number | string;
  offset?: number | string;
} & React.HTMLAttributes<HTMLDivElement>;

const [name, bem] = createNamespace('col');

const Col = ({ className, span, offset, ...props }: ColProps) => {
  return (
    <div
      className={cls(className, bem({ [`${span}`]: span, [`offset-${offset}`]: offset }))}
      {...props}
    />
  );
};

Col.displayName = name;

export default Col;
