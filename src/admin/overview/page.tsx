"use client"
import React, { useEffect, useState } from 'react';
import { useUser, useSession } from "@clerk/clerk-react";
import Image from 'next/image';
import { usePathname } from "next/navigation";


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

interface Post {
  _id: string;
  title: string;
  author: string;
  slug: string;
  userId: string;
  description: string;
  content: string;
  imageUrl: string;
  status: string;
  // Ajoutez d'autres champs d'utilisateur au besoin
}

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();

  const pathName = usePathname();


  const { session } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [users, setUsers] = useState<User[]>([]);



  useEffect(() => {

    async function checkAndCreateUser() {
      try {
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.primaryEmailAddress?.emailAddress,
            userId: user?.id,
            username: user?.username,
            fullname: user?.fullName,
            imageUrl: user?.imageUrl,
          }),
        });

        if (!response.url.includes(pathName)) {
          window.location.href = response.url;
        } else {
          console.log("Okay");

        }

      } catch (error) {
        console.error("Error checking or creating user:", error);
      }
    }

    if (isSignedIn) {
      checkAndCreateUser();
    }
  }, [pathName, isSignedIn, user]);


  async function fetchUser() {
    try {
      const response = await fetch(`/api/user/${user?.id}`);
      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);


      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  console.log(userDetails);
  async function fetchPost() {
    try {
      console.log("log 1");

      const response = await fetch(`/api/post/${user?.id}`);
      console.log("log 2");

      if (response.ok) {
        console.log("log 3");

        const postData = await response.json();
        setPostDetails(postData);


      } else {
        throw new Error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }
  console.log(userDetails);





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

  const totalUsers = users.length;
  const totalMembers = users.filter(user => user.role === "Member").length;
  const totalAdmins = users.filter(user => user.role === "Admin").length;


  return (
    <div className=" container">
      Tableau de bord admin
      <div className="flex flex-row gap-6 w-full mt-5" >
        <div className="flex flex-col gap-4 w-1/4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns=""
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500"> Users </strong>

            <p>
              <span className="text-5xl font-medium text-gray-900">{totalUsers}</span>

              <span className="text-xs text-gray-500"> from {totalUsers}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500"> Members </strong>

            <p>
              <span className="text-5xl font-medium text-gray-900">{totalMembers}</span>

              <span className="text-xs text-gray-500"> from {totalUsers}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/4 rounded-lg border border-gray-100 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500"> Admin </strong>

            <p>
              <span className="text-5xl font-medium text-gray-900">{totalAdmins}</span>

              <span className="text-xs text-gray-500"> from {totalUsers}</span>
            </p>
          </div>
        </div>

      </div>
      {/* <button onClick={() => fetchUser()} className='h-9 w-24 text-blue-700'>
        Get user Data
      </button>
      <button onClick={() => fetchPost()} className='h-9 w-24 text-blue-700'>
        Get Post Data
      </button>

      <div>
        {userDetails && (
          <div>
            <h2>C\'est Bon</h2>
          </div>
        )}
        {postDetails && (
          <div>
            <h2>C\'est Bon</h2>
          </div>
        )}
      </div> */}
      <div className="">
        <h1 className="text-3xl font-bold mb-4 mt-10 ">Recents utilisateurs</h1>
        <table className="table-auto ">
          <thead className="bg-gradient-to-tl from-gray-800 to-blue-500 text-white" >
            <tr>
              <th className="border px-4 py-2">Profile</th>
              <th className="border px-4 py-2">Nom</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Rôle</th>
              <th className="border px-4 py-2">...</th>
              {/* Ajoutez d'autres colonnes au besoin */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">
                  <Image alt='cool' src={user.imageUrl} width={30} height={39} className=" rounded-full" />
                </td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">...</td>
                {/* Ajoutez d'autres colonnes au besoin */}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}