"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';


export default function Page() {
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/member');
        const data = await response.json();
        setPosts(data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/admin/members/update?slug=${post.slug}`)
  }

  const handleView = (post) => {
    window.open(`/about/view?slug=${post.slug}`, '_blank');
  }

  const handleDelete = async (post) => {
    const hasComfirmed = confirm("are you sure you want to delete this posts")

    if (hasComfirmed) {
      try {
        await fetch(`/api/member/${post.slug}`, {
          method: 'DELETE',
        });

        const filteredPost = posts.filter((p) => p.slug !== post.slug);
        setPosts(filteredPost);

      } catch (error) {
        console.log(error);
      }
    }
  }




  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {posts && posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg overflow-hidden  shadow-md  mb-4">
            <Image  src={post.imageUrl} width={500} height={300} onClick={() =>handleView(post)} alt={post.fullname} className="w-full cursor-pointer object-cover h-48 mb-4" />
            <div className="p-4">
              <h2 onClick={() =>handleView(post)} className="text-xl cursor-pointer font-semibold mb-2">{post.fullname}</h2>
              <p className="text-gray-600 mb-4 line-clamp-5">{post.description}</p>
              <p className="text-gray-500">{post.nationality}</p>
              <div className=" flex justify-between mt3" style={{ marginTop: 10, }} >
                <button onClick={() => handleEdit(post)} className="update-button" >Update Member</button>
                <button onClick={() => handleDelete(post)} className="delete-button" >Delete Member</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}



