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
                solid: 'dark:text-blue-500/95 dark:bg-blue-400/20 w-full font-semibold justify-center rounded-lg',
            },
        },
        range: {
            default: {
                color: 'blue',
                size: 'sm',
            },
            thumb: {
                background: '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-white [&::-moz-range-thumb]:bg-current',
                ring: '[&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-current [&::-webkit-slider-thumb]:dark:ring-white'
            },
            track: {
                background: '[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-white/90 [&::-moz-range-track]:dark:bg-white/90'
            },
            progress: {
                background: 'dark:bg-blue-500'
            }
        },
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 bottom-[unset]'
        }
    }
})
