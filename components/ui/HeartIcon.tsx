interface HeartIconProps {
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function HeartIcon({ width = 28, height = 26, className, style }: HeartIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M14 24.5C14 24.5 2 16.5 2 8.5C2 5.186 4.686 2.5 8 2.5C10.21 2.5 12.15 3.67 13.27 5.44L14 6.6L14.73 5.44C15.85 3.67 17.79 2.5 20 2.5C23.314 2.5 26 5.186 26 8.5C26 16.5 14 24.5 14 24.5Z"
        fill="#d4a0a0"
      />
    </svg>
  )
}
