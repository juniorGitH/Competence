"use client"
import React, { useEffect, useState } from 'react'
import { useUser, useSession } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";
import Image from 'next/image';

interface User {
    _id: string;
    email: string;
    userId: string;
    username: string;
    fullname: string;
    imageUrl: string;
    role: string;
    // Ajoutez d'autres champs d'utilisateur au besoin
}


export default function Page() {
    const { isSignedIn, user, isLoaded } = useUser();

    const pathName = usePathname();
    const [users, setUsers] = useState<User[]>([]);




    useEffect(() => {
        async function fetchUsers() {
            try {
                const reponse = await fetch('/api/user');
                if (reponse.ok) {
                    const donneesUtilisateurs = await reponse.json();
                    setUsers(donneesUtilisateurs);
                } else {
                    throw new Error("Échec de la récupération des utilisateurs");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        }
        fetchUsers();
    }, []);


    return (
        <div>
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-4 mt-20 ">Liste des utilisateurs</h1>
                <table className="table-auto w-full">
                    <thead className="bg-gradient-to-tl from-gray-800 to-blue-500 text-white" >
                        <tr>
                            <th className="border px-10 py-2">Profile</th>
                            <th className="border px-10  py-2">Nom</th>
                            <th className="border px-10  py-2">Email</th>
                            <th className="border px-10  py-2">Rôle</th>
                            <th className="border px-4  py-2">...</th>
                            {/* Ajoutez d'autres colonnes au besoin */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="border px-10  py-2">
                                    <Image alt='cool' src={user.imageUrl} width={30} height={39} className=" rounded-full" />
                                </td>
                                <td className="border px-10  py-2">{user.username}</td>
                                <td className="border px-10  py-2">{user.email}</td>
                                <td className="border px-10  py-2">{user.role}</td>
                                <td className="border px-4  py-2">...</td>
                                {/* Ajoutez d'autres colonnes au besoin */}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
