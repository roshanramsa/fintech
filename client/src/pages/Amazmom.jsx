import React from 'react';

const products = [
  { id: 1, name: "Pragyan Hoodie", price: 9999, image: "src/assets/Hoodie.png" },
  { id: 2, name: "Pragyan T-Shirt", price: 5999, image: "src/assets/tshirt.jpeg" },
  { id: 3, name: "Pragyan Sweatshirt", price: 7999, image: "src/assets/sweatshirt.webp" },
  { id: 4, name: "Pragyan Cap", price: 2999, image: "src/assets/cap.webp" }
];

const Amazmom = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">Pragyan Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg font-bold text-pink-600">₹{product.price}</p>
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-600">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amazmom;
