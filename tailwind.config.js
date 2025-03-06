import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    extend: {
        fontFamily: {
            sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        },
        aspectRatio: {
            '2/3': '2 / 3',
        },
        colors: {
            main_color: '#031930',
        },
        margin: {
            '18': '4.5rem',
        },
        fontSize: {
            'xs-extra': '10px',
        },
    },

    plugins: [forms],
};
