"use client"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";



const Topbar = () => {
    const user = useUser();
    useEffect(() => {

        const name: any = user.user?.emailAddresses;
        const userId: any = user.user?.id;
        console.log(name + "   " + userId);

    }, [user])


    return (
        <div className=" h-20 flex flex-1 w-full flex-row border-b-2 border-blue-100 px-8 justify-between items-center bg-white  z-20 top-0">
            <div className="" >
                <h3 className=" text-3xl" >DashBoard</h3>
                <h4> Welcome {user.user?.username} !</h4>

            </div>
            <UserButton />
        </div>
    );
};

export default Topbar;
