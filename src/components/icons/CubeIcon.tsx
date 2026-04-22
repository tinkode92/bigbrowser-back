interface CubeIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const CubeIcon = ({
  width = 19,
  height = 19,
  fill = '#230849',
  className = '',
}: CubeIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_485_29185)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.41663 0.63673C9.28623 0.595048 9.1461 0.595048 9.0157 0.63673C6.20835 1.53414 4.10145 2.58256 1.63527 4.19519C1.44904 4.31696 1.28769 4.46817 1.1559 4.6407C1.22034 4.65412 1.28421 4.67553 1.34618 4.70542L9.217 8.50064L17.0856 4.7097C17.1489 4.6792 17.2142 4.65753 17.2801 4.64419C17.1479 4.47029 16.9856 4.31794 16.7981 4.19539C14.3318 2.5827 12.2239 1.53413 9.41663 0.63673ZM0.763134 13.0374C0.526399 10.6089 0.519605 8.59615 0.713736 6.22769L8.39397 9.93102V17.8277C5.88797 16.9739 3.91374 15.9643 1.63124 14.4714C1.13953 14.1497 0.82014 13.6221 0.763134 13.0374ZM10.0399 17.8273C12.5453 16.9736 14.5206 15.964 16.803 14.4714C17.2947 14.1497 17.6141 13.6221 17.6711 13.0373C17.9076 10.6099 17.9141 8.59796 17.72 6.231L10.0399 9.93116V17.8273Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_485_29185">
          <rect width="18.4339" height="18.4339" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CubeIcon;
