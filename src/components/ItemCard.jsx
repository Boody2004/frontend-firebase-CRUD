import { useState, useEffect } from "react";

function ItemCard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://app-hanxxmv2aa-uc.a.run.app/api/read/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading)
    return (
      <h1 className="text-4xl font-bold text-gray-100">Loading products...</h1>
    );
  if (error)
    return <h3 className="text-2xl font-bold text-red-600">Error: {error}</h3>;

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-100 mb-8">All Items</h1>

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
                <td className="py-4 px-6 text-gray-300">{item.name}</td>
                <td className="py-4 px-6 text-gray-300">{item.description}</td>
                <td className="py-4 px-6 text-blue-400 font-medium">
                  ${item.price}
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
