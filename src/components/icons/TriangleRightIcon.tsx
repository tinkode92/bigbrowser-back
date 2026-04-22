interface TriangleRightIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const TriangleRightIcon = ({
  width = 15,
  height = 15,
  fill = '#230849',
  className = '',
}: TriangleRightIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_484_46174)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2184 6.50906C12.2184 8.35803 6.70145 11.3928 3.74214 12.8876C2.89365 13.3162 1.9165 12.6925 1.9165 11.7419L1.9165 1.27619C1.9165 0.325623 2.89366 -0.298055 3.74214 0.130504C6.70146 1.62537 12.2184 4.6601 12.2184 6.50906Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_484_46174">
          <rect width="14.1352" height="14.1352" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TriangleRightIcon;
