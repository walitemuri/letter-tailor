import { useState } from "react";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]
const [animal, setAnimal] = useState("")

const SearchParams = () => {
  const [location, setLocation] = useState("");
  return (
    <div className="search-params">
        <form action="">
            <label htmlFor="location">
                Location
                <input onChange={(e) => setLocation(e.target.value)} type="text"  id="location" value={location} placeholder="Location"/>
            </label>
            <label htmlFor="animal">
                
            </label>
            <button>Submit</button>
        </form>
    </div>
  )
};

export default SearchParams;