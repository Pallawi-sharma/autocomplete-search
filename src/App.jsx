import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [cache, setCache] = useState({});
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    if(cache[input]){
      console.log("catch");
      
      setRecipes(cache[input]);
      return;
    }
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await res.json();
    setRecipes(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes}));
  };

  useEffect(() => {
    console.log("api");
    
    const timmer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timmer);
    };
  }, [input]);

  return (
    <>
      <div className="header-container">
        <h1>Autocomplete Search</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        <button className="search-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
     {showResults && (
       <div className="result-container">
       {recipes.map((r) => (
         <div key={r.id} className="result-item">
           {r.name}
         </div>
       ))}
     </div>
     )}
    </>
  );
}

export default App;
