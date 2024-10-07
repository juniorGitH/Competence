import React, { useState, useRef, useEffect } from 'react';
import GeneralC from './GeneralC';

interface Discussion {
  participant: string;
  lastMessage: string;
}

interface Message {
  type: 'sent' | 'received';
  text: string;
}

// Simuler un appel à l'API (remplacez-le par un vrai appel API plus tard)
const fetchDiscussions = (): Promise<Discussion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { participant: 'John Doe', lastMessage: 'Hello!' },
        { participant: 'Jane Smith', lastMessage: 'How are you?' },
        { participant: 'John Doe', lastMessage: 'Hello!' },
        { participant: 'Jane Smith', lastMessage: 'How are you?' },
        // Ajoutez d'autres discussions ici
      ]);
    }, 1000);
  });
};

const Discussions: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newDiscussion, setNewDiscussion] = useState<string>('');
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Simuler la récupération des discussions
  useEffect(() => {
    fetchDiscussions().then((data) => setDiscussions(data));
  }, []);

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = messageInputRef.current?.value.trim();

    if (messageText) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'sent', text: messageText },
      ]);

      // Effacer le champ de message
      if (messageInputRef.current) {
        messageInputRef.current.value = '';
      }
    }
  };

  const handleNewDiscussion = () => {
    if (newDiscussion.trim() !== '') {
      setDiscussions((prevDiscussions) => [
        ...prevDiscussions,
        { participant: newDiscussion, lastMessage: '' },
      ]);
      setNewDiscussion('');
    }
  };

  return (
    <>
      <div className="min-h-0 h-1/ flex flex-col p-6 bg-gray-500" >
        <h1 className="text-2xl font-bold text-gray-100 mb-4 "  style={{ marginTop: '5%' }} >Discussions</h1>
        <div className="flex flex-row gap-4">
          {/* Liste des discussions */}
          <div className="w-1/4  shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Conversations</h2>
            <div className="overflow-y-auto h-96">
              <button
                className="mb-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={handleNewDiscussion}
              >
                Nouvelle Discussion
              </button>

              {discussions.length === 0 ? (
                <p className="text-center text-gray-500">Chargement...</p>
              ) : (
                discussions.map((discussion, index) => (
                  <div
                    key={index}
                    className="p-2 mb-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {discussion.participant}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {discussion.lastMessage || 'Aucun message'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat */}
          <div className="w-3/4  shadow-lg rounded-lg p-4 flex flex-col  style={{ marginTop: '5%' }}">
            <h2 className="text-lg font-semibold mb-4">Discussion</h2>
            <div className="flex-grow overflow-y-auto h-96">
              {/* Zone de conversation */}
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">Aucun message</p>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.type === 'sent' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs p-2 rounded-lg ${
                        message.type === 'sent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))
              )}
              {/* Référence pour scroller au dernier message */}
              <div ref={chatEndRef} />
            </div>

            {/* Formulaire d'envoi de message */}
            <div className="mt-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                  ref={messageInputRef}
                  placeholder="Tapez votre message..."
                  className="flex-grow p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transitin"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <GeneralC />
    </>
  );
};

export default Discussions;
