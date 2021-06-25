import * as React from 'react';
import { CircularIcon as Loader } from '../Toast/Loader';
import cn from 'classnames';
import { createNamespace } from '../utils';
import './button.less';

const [name] = createNamespace('button');

interface ButtonProps {
  size?: 'normal' | 'small' | 'large' | 'mini';
  type?: 'default' | 'primary';
  block?: boolean;
  loading?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default ({
  children,
  loading,
  block,
  round,
  size = 'normal',
  type = 'default',
  className,
  style,
  disabled,
  onClick,
}: ButtonProps) => {
  const cls = cn(name, `zhp-button--${size}`, `zhp-button--${type}`, className, {
    'zhp-button--round': round,
    'zhp-button--disabled': disabled,
    'zhp-button--loading': loading,
    block,
  });

  const handleClick = React.useCallback(() => {
    if (onClick && !loading && !disabled) onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className={cls} onClick={handleClick} style={style}>
      <div className="zhp-button__content">
        {loading && <Loader className="zhp-button__loader" />}
        {children}
      </div>
    </div>
  );
};
