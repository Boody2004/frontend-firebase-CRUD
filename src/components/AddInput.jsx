import { useState, useEffect } from "react";
import { postNewItem } from "../services/api";

const AddItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(null); // Changed from error/success to single "done" state

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [done]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDone(null);

    try {
      const newItem = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const createdItem = await postNewItem(newItem);
      onItemAdded(createdItem);
      setDone("Item added successfully!");
      setFormData({
        id: "",
        name: "",
        description: "",
        price: "",
      });
    } catch (err) {
      setDone(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-100 mb-8">Add New Item</h1>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        {done && (
          <div className="mb-4 p-3 bg-green-600 text-green-100 rounded">
            Added!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="id"
            placeholder="ID*"
            value={formData.id}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 rounded p-2"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 rounded p-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 rounded p-2"
            rows="3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price*"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 rounded p-2"
            step="0.01"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting || done}
            className={`px-4 py-2 rounded font-medium ${
              isSubmitting || done
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {done ? "Done!" : isSubmitting ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItemForm;
