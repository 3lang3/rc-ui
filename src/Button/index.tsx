import * as React from 'react';
import { CircularIcon as Loader } from '../Toast/Loader';
import cn from 'classnames';
import { createNamespace } from '../utils';
import './index.less';

const [name, bem] = createNamespace('button');

interface ButtonProps {
  /**
   * 按钮大小
   */
  size?: 'normal' | 'small' | 'large' | 'mini';
  /**
   * 按钮类型
   */
  type?: 'default' | 'primary';
  /**
   * 幽灵按钮
   */
  ghost?: boolean;
  /**
   * 全宽
   */
  block?: boolean;
  /**
   * 危险按钮
   */
  danger?: boolean;
  /**
   * 自定义颜色(非ghost按钮下支持渐变色)
   */
  color?: string;
  loading?: boolean;
  /**
   * 圆角按钮
   */
  round?: boolean;
  icon?: React.ReactNode;
  /**
   * 禁用状态
   */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  children,
  loading,
  block = true,
  round,
  size = 'normal',
  type = 'default',
  danger,
  color,
  ghost,
  className,
  style,
  disabled,
  onClick,
}: ButtonProps) => {
  const cls = cn(
    className,
    bem([
      type,
      size,
      {
        block,
        round,
        danger,
        ghost,
        loading,
        disabled,
      },
    ]),
  );

  const handleClick = React.useCallback(() => {
    if (onClick && !loading && !disabled) onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const renderLoader = () => {
    const loaderProps = {} as any;
    if (color) {
      loaderProps.stroke = color;
    }
    return <Loader className={bem('icon')} {...loaderProps} />;
  };

  const customStyle = {} as React.CSSProperties;
  if (color) {
    customStyle.color = ghost ? color : '#fff';
    customStyle.background = ghost ? 'transparent' : color;
    // hide border when color is linear-gradient
    if (color.includes('gradient')) {
      customStyle.border = 0;
    } else {
      customStyle.borderColor = color;
    }
  }

  return (
    <div className={cls} onClick={handleClick} style={{ ...style, ...customStyle }}>
      <div className={bem('content')}>
        {loading && renderLoader()}
        <div className={bem('text')}>{children}</div>
      </div>
    </div>
  );
};

Button.displayName = name;

export default Button;
