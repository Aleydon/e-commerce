import clsx from 'clsx';

export interface TextProps {
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

export default function Text({ size = 'large', children }: TextProps) {
  return (
    <span
      className={clsx('bold', {
        'text-base': size === 'small',
        'text-xl': size === 'medium',
        'text-3xl': size === 'large'
      })}
    >
      {children}
    </span>
  );
}
