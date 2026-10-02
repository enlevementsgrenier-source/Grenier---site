import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-14 w-auto',
  variant = 'color',
  showSubtitle = true
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 460 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Oswald:wght@600;700&display=swap');
              .logo-script {
                font-family: 'Lobster', cursive;
              }
              .logo-sans {
                font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
              }
              .logo-banner {
                font-family: 'Oswald', 'Arial Narrow', 'League Gothic', sans-serif;
              }
            `}
          </style>
        </defs>

        {/* 3D shadow for cursive script "Le Grenier" */}
        <text
          x="232"
          y="92"
          textAnchor="middle"
          className="logo-script"
          fontSize="86"
          fontWeight="400"
          fill={isLight ? '#173324' : '#55755C'}
        >
          Le Grenier
        </text>

        {/* Main cursive script "Le Grenier" */}
        <text
          x="230"
          y="90"
          textAnchor="middle"
          className="logo-script"
          fontSize="86"
          fontWeight="400"
          fill={isLight ? '#A5D8B3' : '#8EAE8F'}
        >
          Le Grenier
        </text>

        {/* Subtitle "- DE MÉZOS -" */}
        {showSubtitle && (
          <text
            x="230"
            y="123"
            textAnchor="middle"
            className="logo-sans"
            fontSize="23"
            fontWeight="600"
            letterSpacing="5"
            fill={isLight ? '#F5A38E' : '#EB856E'}
          >
            - DE MÉZOS -
          </text>
        )}

        {/* Bottom Dark Green Banner - comfortably wide and padded */}
        <rect
          x="20"
          y="133"
          width="420"
          height="32"
          rx="3"
          fill={isLight ? '#346B5C' : '#255853'}
        />

        {/* Banner Slogan: LUTTER CONTRE LE GASPILLAGE ET L'EXCLUSION */}
        <text
          x="230"
          y="154"
          textAnchor="middle"
          className="logo-banner"
          fontSize="14.5"
          fontWeight="700"
          letterSpacing="1.2"
          textLength="390"
          lengthAdjust="spacingAndGlyphs"
          fill="#F4EFE6"
        >
          LUTTER CONTRE LE GASPILLAGE ET L'EXCLUSION
        </text>
      </svg>
    </div>
  );
};
