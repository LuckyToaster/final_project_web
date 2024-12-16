import clsx from 'clsx';


export default function Button({ children, className, ...rest }) {
    const baseStyle = 'flex h-10 items-center justify-center rounded-lg bg-green-500 hover:bg-green-700 px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-green-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
    const style = clsx(baseStyle, className)
    return (<button {...rest} className={style}>{children}</button>)
}
