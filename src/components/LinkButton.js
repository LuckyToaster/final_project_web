import Link from 'next/link'

export default function LinkButton({text, href}) {
    const style = 'rounded-md'
    return <Link className={style} href={href}>{text}</Link>
}
