export function PeelMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="peel-mark-clip">
          <rect width="32" height="32" rx="8" />
        </clipPath>
      </defs>
      <g clipPath="url(#peel-mark-clip)">
        <rect width="16" height="16" fill="#FFFFFF" />
        <rect x="16" width="16" height="16" fill="#D1D5DB" />
        <rect y="16" width="16" height="16" fill="#D1D5DB" />
        <rect x="16" y="16" width="16" height="16" fill="#FFFFFF" />
        <circle cx="16" cy="10" r="6" fill="#E11D48" />
        <path fill="#E11D48" d="M5 32C5 19 10 15 16 15C22 15 27 19 27 32Z" />
      </g>
    </svg>
  );
}
