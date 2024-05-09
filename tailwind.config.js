/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        base: 'var(--color-base)',
        base1: 'var(--color-base1)',
        base2: 'var(--color-base2)',
        base3: 'var(--color-base3)',
        base4: 'var(--color-base4)',
        base5: 'var(--color-base5)',

        baseText: 'var(--color-baseText)',
        baseText1: 'var(--color-baseText1)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        secondaryLight: 'var(--color-secondaryLight)',
        accent: 'var(--color-accent)',
        accentDark: 'var(--color-accentDark)',
        baseShadow: 'var(--color-baseShadow)',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
