import { usePathname } from "next/navigation";

const navItems = [
    {label : "Home", href : "/"},
    {label : "Companions", href:"/companions"},
    {label:"My Journey", href:"/my-journey"},
]



const NavItems = () => {
    const pathname = usePathname();
    return(
        <div  className="flex item-center gap-4">
            {navItems.map(({lable, href}) =>(
                <Link href={href} key ={label} className={cn(pathname ===href && 'text-primary font-semibold')}>
                    {label}
                </Link>

            ))}

        </div>

    );
}

export default NavItems