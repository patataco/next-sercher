import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        //Primary
        // primary: "#036DB7",
        // //Text
        // textPrimary: "#262E38",
        // textSecondary: "#696969",
        // textDisabled: "#9E9E9E",
        //Bg
        bgDefault: '#cae9ff',
        // bgPaper: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        innerBorder: 'inset 0 0 0 1px #007CE9',
      },
    },
  },
  plugins: [],
};
export default config;
