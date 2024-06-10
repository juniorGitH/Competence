"use client"
import React, { useEffect, useState } from 'react';
import { useUser, useSession } from "@clerk/clerk-react";



export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { session } = useSession();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (isSignedIn && user) {
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

          if (response.status !== 302) {
            window.location.href = "/user"; // Redirect to admin page if user is already a member or newly created
          }
        } catch (error) {
          console.error("Error checking or creating user:", error);
        }
      }

      checkAndCreateUser();
    }
  }, [isSignedIn, user]);


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



  return (
    <div>
      Tableau de bord admin
      <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
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
          <strong className="block text-sm font-medium text-gray-500"> Profit </strong>

          <p>
            <span className="text-2xl font-medium text-gray-900"> $404.32 </span>

            <span className="text-xs text-gray-500"> from $240.94 </span>
          </p>
        </div>
      </div>

      {/* <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
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
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>

          <span className="text-xs font-medium"> 67.81% </span>
        </div>

        <div>
          <strong className="block text-sm font-medium text-gray-500"> Profit </strong>

          <p>
            <span className="text-2xl font-medium text-gray-900"> $240.94 </span>

            <span className="text-xs text-gray-500"> from $404.32 </span>
          </p>
        </div>
      </article> */}
      <button onClick={() => fetchUser()} className="h-9 w-24 text-blue-700">
        Get user Data
      </button>
      <div>Hello {user?.fullName} !</div>
      <div>Hello {user?.id} !</div>
      <div>Hello {user?.primaryEmailAddress?.emailAddress} !</div>
      {/* <div>
        {userDetails && (
          <div>
            <h2>C'est Bon</h2>
          </div>
        )}
      </div> */}
    </div>
  );
}