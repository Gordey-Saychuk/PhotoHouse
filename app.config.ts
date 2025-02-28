export default defineAppConfig({
    ui: {
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
        }
    }
})
