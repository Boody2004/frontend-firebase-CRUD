import ItemCard from "../components/ItemCard";

function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <ItemCard item={{ name: "title1", description: "test", price: "111" }} />
    </div>
  );
}

export default Home;
