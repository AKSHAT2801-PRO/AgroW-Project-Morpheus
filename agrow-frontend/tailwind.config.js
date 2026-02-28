/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'xs': '480px',
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    light: 'var(--color-primary-light)',
                    dark: 'var(--color-primary-dark)',
                    bg: 'var(--color-primary-bg)',
                },
                earth: {
                    DEFAULT: 'var(--color-earth)',
                    light: 'var(--color-earth-light)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    light: 'var(--color-accent-light)',
                },
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    hover: 'var(--color-surface-hover)',
                },
                danger: 'var(--color-danger)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
            },
            fontFamily: {
                sans: ['Outfit', 'system-ui', 'sans-serif'],
            },
            spacing: {
                'xs': 'var(--spacing-xs)',
                'sm-token': 'var(--spacing-sm)',
                'md-token': 'var(--spacing-md)',
                'lg-token': 'var(--spacing-lg)',
                'xl-token': 'var(--spacing-xl)',
                '2xl-token': 'var(--spacing-2xl)',
            },
            borderRadius: {
                'sm-token': 'var(--radius-sm)',
                'md-token': 'var(--radius-md)',
                'lg-token': 'var(--radius-lg)',
                'xl-token': 'var(--radius-xl)',
                'pill': 'var(--radius-pill)',
            },
        },
    },
    plugins: [],
}
