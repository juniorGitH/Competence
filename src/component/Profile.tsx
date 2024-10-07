// Profile.js
import React from 'react';
import General from './General';

const Profile = () => {
  const user = {
    name: "Amedin Abla Marceline",
    email: "amedin@example.com",
    bio: "Développeur passionné par les nouvelles technologies et l'innovation.",
    age: 22,
    city: "Lomé",
    country: "Togo",
    avatar: "https://via.placeholder.com/150" // Remplacez ceci par l'URL de l'image de profil
  };

  return (< >
       
       
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"  >
      <img 
        src={user.avatar} 
        alt={`${user.name}'s avatar`} 
        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
        style={{ marginTop: '15%' }}  />
      <h1 className="text-3xl font-bold mb-2 text-center text-white">{user.name}</h1>
      <p className="text-gray-800 mb-2">{user.email}</p>
      <p className="text-gray-700 text-center">{user.bio}</p>
      
      <h2 className="text-xl font-semibold mt-4 text-white">Informations supplémentaires</h2>
      <ul className="mt-2 space-y-2">
        <li className="flex items-center text-gray-700">
          <span className="material-icons mr-2">calendar_today</span> Âge: {user.age}
        </li>
        <li className="flex items-center text-gray-700">
          <span className="material-icons mr-2">location_on</span> Ville: {user.city}
        </li>
        <li className="flex items-center text-gray-700">
          <span className="material-icons mr-2">flag</span> Pays: {user.country}
        </li>
      </ul>
    </div>
    <General />
    </>
  );
};

export default Profile;
