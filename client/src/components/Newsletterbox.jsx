import React from "react";

function Newsletterbox() {
  async function handleSubmit(params) {
    e.preventDefault();
  }
  return (
    <div>
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo dicta hic
        vitae cumq corporis! Perspiciatis, quibusdam aliquam.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-lg"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full rounded-lg sm:flex-1 outline-none"
        />
        <button className="bg-black text-white px-4 py-2 rounded-full border">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletterbox;
