interface ArrowRightIcon {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ArrowRightIcon = ({
  width = 20,
  height = 20,
  fill = '#230849',
  className = '',
}: ArrowRightIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_485_28909)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0643 15.8557C10.7034 16.6948 11.8521 17.116 12.991 16.6813C14.3212 16.1735 15.5434 15.1761 16.4892 14.0604C17.4455 12.9324 18.258 11.5208 18.633 10.0208C18.7146 9.69464 18.7146 9.35344 18.633 9.02728C18.258 7.52727 17.4455 6.11571 16.4892 4.98767C15.5434 3.87202 14.3212 2.87453 12.991 2.36685C11.8521 1.93211 10.7034 2.35324 10.0643 3.19234C9.48801 3.94915 9.37494 4.94692 9.70707 5.81167C9.89266 6.29481 10.0942 6.89951 10.2478 7.55178L1.97255 7.55178C0.883678 7.55178 0.000976194 8.43449 0.000976242 9.52335C0.00097629 10.6122 0.883678 11.4949 1.97255 11.4949L10.2481 11.4949C10.0944 12.1477 9.89278 12.7529 9.70707 13.2364C9.37492 14.1012 9.48801 15.0989 10.0643 15.8557Z"
          fill={fill}
          fillOpacity="0.9"
        />
      </g>
      <defs>
        <clipPath id="clip0_485_28909">
          <rect
            width="19.0502"
            height="19.0502"
            fill="white"
            transform="translate(0 19.0502) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightIcon;
