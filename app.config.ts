export default defineAppConfig({
    ui: {
        primary: 'blue',
        container: {
            constrained: 'max-w-md',
            padding: 'px-3 sm:px-4 lg:px-6'
        },
        button: {
            default: {
                size: 'xl',
                color: 'blue',
            },
            variant: {
                solid: 'dark:text-blue-500 dark:bg-blue-500/20 w-full justify-center rounded-lg',
            },
        },
        range: {
            default: {
                color: 'blue',
                size: 'sm',
            },
            thumb: {
                background: '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-white [&::-moz-range-thumb]:bg-current',
                ring: '[&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-current [&::-webkit-slider-thumb]:dark:ring-white'
            },
            track: {
                background: '[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700 [&::-moz-range-track]:dark:bg-gray-700'
            },
            progress: {
                background: 'dark:bg-blue-500'
            }
        }
    }
})
