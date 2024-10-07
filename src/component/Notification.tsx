import React, { useState, useEffect } from 'react';
import General from './General';

// Structure de données pour les notifications
interface NotificationData {
  id: number;
  name: string;
  message: string;
  time: string;
  avatarUrl: string;
}

const Notification: React.FC = () => {
  // Simuler des notifications avec un état local
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Simuler une récupération de notifications depuis une API
  useEffect(() => {
    const fetchNotifications = () => {
      const data: NotificationData[] = [
        {
          id: 1,
          name: 'John Doe',
          message: 'Hello!',
          time: '2h ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        {
          id: 2,
          name: 'Jane Smith',
          message: 'Hi, how are you?',
          time: '5h ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        {
          id: 3,
          name: 'Alice Cooper',
          message: 'New update available!',
          time: '1 day ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        {
          id: 1,
          name: 'John Doe',
          message: 'Hello!',
          time: '2h ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        {
          id: 2,
          name: 'Jane Smith',
          message: 'Hi, how are you?',
          time: '5h ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        {
          id: 3,
          name: 'Alice Cooper',
          message: 'New update available!',
          time: '1 day ago',
          avatarUrl: 'https://via.placeholder.com/40',
        },
        // Ajoutez d'autres notifications
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []); // Le tableau vide signifie que l'effet s'exécute uniquement au chargement du composant

  return (
    <>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700" style={{ marginTop: '5%' }}>
          Notifications
        </h1>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <p className="text-center py-6 text-gray-500">Aucune notification</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 flex items-center hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
                >
                  <img
                    src={notification.avatarUrl}
                    alt={notification.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-sm font-semibold text-gray-800">{notification.name}</h2>
                    <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <General />
    </>
  );
};

export default Notification;
