// Commander.tsx
import React, { useEffect, useState } from 'react';

// Définir un type pour les détails de la commande
interface OrderDetails {
  productName: string;
  quantity: number;
  totalPrice: number;
  description: string;
}

const Commander: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // Fonction pour récupérer le prix depuis une API (simulée ici)
  const fetchPrice = async () => {
    // Remplacez ceci par votre appel API réel
    const response = await fetch('https://api.example.com/product-price');
    const data = await response.json();
    setPrice(data.price); // Supposons que l'API retourne un objet avec un champ 'price'
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = quantity * price;
    setOrderDetails({ productName, quantity, totalPrice, description });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full max-w-md mx-auto p-6  rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
        
        <h1 className="text-3xl font-bold mb-6 text-blue-600"  style={{ marginTop: '15%' }}>Passer une Commande</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="productName">Nom du Produit</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantité</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">Prix par Unité</label>
            <input
              type="number"
              id="price"
              value={price}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Commander
          </button>
        </form>

        {orderDetails && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-600">Détails de la Commande</h2>
            <p className="text-gray-700"><strong>Produit:</strong> {orderDetails.productName}</p>
            <p className="text-gray-700"><strong>Quantité:</strong> {orderDetails.quantity}</p>
            <p className="text-gray-700"><strong>Prix Total:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>
            <p className="text-gray-700"><strong>Description:</strong> {orderDetails.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Commander;
