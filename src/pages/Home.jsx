import ItemCard from "../components/ItemCard";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold uppercase mb-8">
          Frontend - crud used firebase🔥
        </h1>
        <div className="w-full max-w-6xl">
          <ItemCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
