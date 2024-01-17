import { useEffect, useRef, useState } from "react";
import { getIngredients } from "../services/food.servise";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const Ingredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchIngredient = searchParams.get("ingredient") || "";
  const recipes = searchParams.get("recipes") || "";
  const input = useRef(null)

  useEffect(() => {
    setError("");
    setIngredients([]);
    if(searchIngredient.length >= 3){
      setError("");
      setIngredients([]);
      getIngredients(searchIngredient)
        .then((data) => {
          setIngredients(data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [searchIngredient]);

  return (
    <div
      className="bg-slate-900 text-white text-center px-10 gap-5 flex flex-col py-20"
      id="ingredient"
    >
      <h1 className="text-4xl font-bold">Ingredients</h1>
      <div className="bg-white max-w-32 border-2 border-black w-full mx-5 px-3 py-1 duration-300 self-center rounded-3xl justify-center items-center hover:max-w-72 gap-3 flex"
      onMouseOut={() => input.current.blur()}
      onMouseOver={() => input.current.focus()}
      >
        <IoSearch className="text-2xl text-slate-900" />
        <input type="search" placeholder="Search..." value={searchIngredient} ref={input} onChange={(e) => setSearchParams({ recipes, ingredient: e.target.value })} className="w-full focus:outline-none text-slate-900 text-sm" />
      </div>
      <p className="text-md font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illo
        deleniti consectetur assumenda voluptas exercitationem minima ducimus,
        nihil error dolor vero blanditiis nulla distinctio illum, eius
        repudiandae saepe mollitia quos atque expedita delectus alias non vel
        veritatis! Ipsa, fugit numquam atque odit eligendi quaerat id minima
        odio quis molestias ut.
      </p>
      <div className="flex justify-center gap-3 min-h-40 items-stretch overflow-hidden">
        <div className="container ingredients flex justify-center last:ml-auto items-center flex-wrap gap-4">
          {ingredients.length && !error ? (
            ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="p-2 rounded-md w-full max-w-xs border-black border-4 flex flex-col gap-2"
              >
                <img
                  draggable="false"
                  className="w-full xl:h-48 lg:h-64 h-64 object-cover rounded-md"
                  src={`https://source.unsplash.com/200x200/?${ingredient.name}`}
                  alt={ingredient.name}
                />
                <h3 className="text-md my-auto bg-black rounded-md py-2 font-bold break-words text-center">
                  {ingredient.name}
                </h3>
              </div>
            ))
          ) : error ? (
            <h4 className="text-sm cursor-not-allowed text-red-700 py-5 font-semibold text-center">
              {error}
            </h4>
          ) : searchIngredient.length < 3 ? (
            <h4 className="text-sm cursor-not-allowed text-red-700 py-5 font-semibold text-center">Word must be at least 3 characters</h4>
          ) : (
            <AiOutlineLoading className="cursor-wait m-auto animate-spin w-8 h-8 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
