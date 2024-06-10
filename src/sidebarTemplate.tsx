import Link from 'next/link';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import Image from 'next/image';


interface SidebarProps {
    data: SidebarItem[];
    board: {
        title: string;
        link: string;
    }
}

interface SidebarItem {
    id: number;
    title: string;
    link: string;
    subtitles?: {
        id: number;
        text: string;
        link: string;
    }[];
}

const Sidebar: React.FC<SidebarProps> = ({ data, board }) => {
    const pathName = usePathname();

    // const isCurrentPage = (href: string) => href === pathName;
    const isCurrentPage = (href: string) => pathName.startsWith(href);


    const [openTitles, setOpenTitles] = useState<number[]>([]);

    const toggleTitle = (id: number) => {
        // Si l'ID de titre cliqué est déjà dans openTitles, on le retire
        if (openTitles.includes(id)) {
            setOpenTitles(openTitles.filter(titleId => titleId !== id));
        } else { // Sinon, on ajoute le nouvel ID et on ferme les autres
            setOpenTitles([id]);
        }
    };

    return (
        <div className="sidebar ">
            <div className="flex items-center justify-center space-x-2 p-2  m-5 mb-20 mt-5 border-2 border-gray-200 bg-black rounded-xl ">
                <Link href={board.link}>
                    <Image src="/logo.svg" width={500} height={300}  alt="Logo" className="w-8 h-8 object-contain" />
                </Link>
                <Link href={board.link} className="">
                    <span className="hidden md:inline font-bold text-md text-white">QUANTUM-ARISE <span className=" text-xs text-blue-200" >{board.title} board</span> </span>
                </Link>
            </div>
            {data.map((item) => (
                <ul key={item.id} className=" mx-5" >
                    <li>
                        <Link href={item?.link} onClick={() => toggleTitle(item.id)} passHref className={`sidebartitle-item  hover:sidebartitle-item:hover  ${isCurrentPage(item.link) ? 'active bg-gradient-to-tl from-gray-500 to-blue-400 ' : ''}`} >
                            {item.title}
                        </Link>
                        {openTitles.includes(item.id) && item.subtitles && (
                            <ul className={`submenu transition-all duration-500 ${openTitles.includes(item.id) ? 'submenu-open' : 'translate-y-full '}`}>
                                {item.subtitles.map((subtitle) => (
                                    <li key={subtitle.id}>
                                        <Link href={subtitle.link} passHref className={`sidebar-item hover:sidebar-item:hover ${isCurrentPage(subtitle.link) ? 'active' : ''}`}>
                                            <h4>{subtitle.text}</h4>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            ))}
            <div className=" flex absolute bottom-0 items-center flex-1  h-14 w-full" >
                <Link href="" className="mx-5 text-md p-3 py-1 rounded-md text-white font-semibold pointer-events-auto bg-gradient-to-tl from-gray-800 to-blue-500 "  ><SignOutButton /></Link>
            </div>
        </div>
    );
};

export default Sidebar;
