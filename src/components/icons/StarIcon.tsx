interface StarIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const StarIcon = ({
  width = 18,
  height = 17,
  fill = '#00B67A',
  className = '',
}: StarIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.62027 12.443L12.366 11.4937L13.931 16.3169L8.62027 12.443ZM17.2405 6.20865H10.6471L8.62027 0L6.59348 6.20865H0L5.33636 10.057L3.30957 16.2656L8.64593 12.4173L11.9298 10.057L17.2405 6.20865Z"
        fill={fill}
      />
    </svg>
  );
};

export default StarIcon;
