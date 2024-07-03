import { useMemo } from 'react';

type IconColor =
  | 'primary'
  | 'default'
  | 'success'
  | 'warn'
  | 'error'
  | 'dark'
  | (string & {});

type IconSize = 'default' | 'small' | 'large';

interface IProps {
  name: string;
  size?: IconSize | number;
  color?: IconColor;
  profix?: string; // icon的前缀
  width?: number;
  height?: number;
}

const colorMap: Record<IconColor, string> = {
  primary: '#409EFF',
  success: '#67C23A',
  error: '#bb1b1b',
  warn: '#F56C6C',
  default: '#333333',
  dark: '#ffffffA6',
};

const sizeMap: Record<IconSize, number> = {
  default: 16,
  small: 12,
  large: 24,
};

export default function SvgIcon(props: IProps) {
  const {
    color = 'default',
    name,
    profix = 'icon',
    size = 'default',
    width,
    height,
  } = props;

  const iconName = useMemo<string>(() => {
    return `#${profix}-${name}`;
  }, [profix, name]);

  const iconColor = useMemo<string | undefined>(() => {
    return colorMap[color] || color;
  }, [color]);

  const iconSize = useMemo<number | undefined>(() => {
    if (typeof size === 'string') {
      return sizeMap[size];
    }
    return size;
  }, [size]);
  return (
    <svg
      style={{
        height: height ? height : iconSize,
        width: width ? width : iconSize,
      }}
    >
      <use href={iconName} fill={iconColor} />
    </svg>
  );
}
