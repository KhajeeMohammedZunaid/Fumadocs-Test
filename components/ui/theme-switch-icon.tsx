import type { SVGProps } from "react";

export function ThemeSwitchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer circular ring */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* Center vertical dividing line */}
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Right semi-circle 45-degree diagonal hatched lines */}
      <g clipPath="url(#theme-switch-clip)">
        <line
          x1="12"
          y1="7.5"
          x2="18.5"
          y2="1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="12"
          x2="22"
          y2="2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="16.5"
          x2="23"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="21"
          x2="23.5"
          y2="9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="23"
          x2="23"
          y2="15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="theme-switch-clip">
          <path d="M12 3 A9 9 0 0 1 12 21 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

