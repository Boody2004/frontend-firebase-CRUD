import { useState, useEffect } from "react";
import { getAllItems, deleteItem } from "../services/api";

function ItemCard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // get
  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  // delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
      setSuccessMessage("Item deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h1 className="text-4xl font-bold text-gray-100">Loading products...</h1>
    );
  if (error)
    return <h3 className="text-2xl font-bold text-red-600">Error: {error}</h3>;

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-100 mb-8">All Items</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-600 text-white rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                Description
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                Edit
              </th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-750 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-blue-400 font-medium">
                  {item.id}
                </td>
                <td className="py-4 px-6 text-gray-300">
                  <input
                    type="text"
                    name="name"
                    placeholder={item.name}
                    className="bg-gray-700 text-gray-100 rounded p-2"
                    step="0.01"
                  />
                </td>
                <td className="py-4 px-6 text-gray-300">
                  <input
                    type="text"
                    name="description"
                    placeholder={item.description}
                    className="bg-gray-700 text-gray-100 rounded p-2"
                    step="0.01"
                  />
                </td>
                <td className="py-4 px-6 text-blue-400 font-medium">
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      placeholder={item.price}
                      className="bg-gray-700 text-gray-100 rounded p-2 pl-5"
                      step="0.01"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      $
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-blue-400 font-medium">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-4 px-6 text-blue-400 font-medium">
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ItemCard;
