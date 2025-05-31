function ItemCard({ item }) {
  return (
    <div className="item-card">
      <div className="item-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}</p>
      </div>
    </div>
  );
}

export default ItemCard;
