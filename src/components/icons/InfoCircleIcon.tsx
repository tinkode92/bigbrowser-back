interface InfoCircleIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const InfoCircleIcon = ({
  width = 20,
  height = 20,
  fill = '#230151',
  className = '',
}: InfoCircleIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="20" height="20" rx="10" fill={fill} />
      <path
        d="M9.744 5.948C9.28 5.948 8.8 5.628 8.8 5.052C8.8 4.476 9.28 4.172 9.744 4.172C10.24 4.172 10.704 4.476 10.704 5.052C10.704 5.628 10.24 5.948 9.744 5.948ZM8.912 7.324H10.592V15.5H8.912V7.324Z"
        fill="white"
      />
    </svg>
  );
};

export default InfoCircleIcon;
