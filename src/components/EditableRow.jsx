import { useState } from "react";

const EditableRow = ({ item, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editData,
      id: item.id,
    });
  };

  return (
    <tr className="bg-gray-750">
      <td className="py-3 px-4 text-blue-400">{item.id}</td>
      <td className="py-3 px-4">
        <input
          name="name"
          value={editData.name}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded px-2 py-1"
        />
      </td>
      <td className="py-3 px-4">
        <textarea
          name="description"
          value={editData.description}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded px-2 py-1"
          rows="2"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <span className="mr-1">$</span>
          <input
            name="price"
            type="number"
            step="0.01"
            value={editData.price}
            onChange={handleChange}
            className="w-full bg-gray-700 rounded px-2 py-1"
          />
        </div>
      </td>
      <td className="py-3 px-4 space-x-2">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-green-600 rounded"
        >
          Save
        </button>
        <button onClick={onCancel} className="px-3 py-1 bg-red-600 rounded">
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
