interface DoubleCommasIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const DoubleCommasIcon = ({
  width = 58,
  height = 51,
  fill = '#0C0C0C',
  className,
}: DoubleCommasIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 58 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M57 1V22.297C57 29.569 54.92 35.629 50.585 40.65C46.424 45.671 41.223 48.788 35.155 50V40.131C42.263 37.36 45.731 31.82 45.731 23.162H35.155V1H57ZM22.845 1V22.297C22.845 29.569 20.765 35.629 16.43 40.65C12.269 45.671 7.068 48.788 1 50V40.131C8.108 37.36 11.576 31.82 11.576 23.163H1V1H22.845Z"
        fill={fill}
        fillOpacity="0.06"
      />
    </svg>
  );
};

export default DoubleCommasIcon;
