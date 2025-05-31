function ItemCard({ item }) {
  return (
    <div className="item-card">
      <div className="item-info">
        <h1 className="text-3xl">{item.name}</h1>
        <p className="text-2xl">{item.description}</p>
        <p className="text-2xl">{item.price}</p>
      </div>
    </div>
  );
}

export default ItemCard;
