import { useEffect, useRef, useState } from "react";
import { getRecipes } from "../services/food.servise";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const ingredient = searchParams.get("ingredient") || "";
  const searchRecipes = searchParams.get("recipes") || "";
  const input = useRef(null);

  const handleNext = () => {
    handleGetRecipes(offset + 20);
  };

  const handlePrev = () => {
    console.log(offset);
    if (offset < 0) return;
    handleGetRecipes(offset - 20);
  };

  const handleGetRecipes = (value) => {
    setNextButton(false);
    setPrevButton(false);
    setLoading(true);
    setError("");
    getRecipes(searchRecipes, value)
      .then((data) => {
        if (data === recipes) {
          setNextButton(false);
        } else {
          setNextButton(true);
          setOffset(value);
          setRecipes(data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setPrevButton(value > 0);
        setLoading(false);
      });
  };

  useEffect(() => {
    if(searchRecipes.length > 0) {
      setOffset(0);
      handleGetRecipes(0);
      return;
    };
    handleGetRecipes(offset);
  }, [searchRecipes]);

  useEffect(()=>{
    document.body.style.overflow = "auto";
  }, [])

  return (
    <div
      className="bg-black text-white text-center px-20 sm:px-10 gap-5 flex flex-col py-20"
      id="recipes"
    >
      <h1 className="text-4xl font-bold">Recipes</h1>
      <div
        className="bg-white max-w-32 border-2 border-slate-900 w-full mx-5 px-3 py-1 duration-300 self-center rounded-3xl justify-center items-center hover:max-w-72 gap-3 flex"
        onMouseOut={() => input.current.blur()}
        onMouseOver={() => input.current.focus()}
      >
        <IoSearch className="text-2xl text-slate-900" />
        <input
          type="search"
          placeholder="Search..."
          value={searchRecipes}
          ref={input}
          onChange={(e) =>
            setSearchParams({ recipes: e.target.value, ingredient })
          }
          className="w-full focus:outline-none text-slate-900 text-sm"
        />
      </div>
      <p className="text-md font-medium">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nesciunt
        similique quasi qui. Architecto delectus aperiam soluta consectetur
        recusandae eius?
      </p>
      <div className="flex justify-center gap-3 min-h-72 items-stretch overflow-hidden">
        {prevButton && (
          <button
            className="min-h-full cursor-pointer hover:bg-slate-800 px-1 rounded-l-xl border border-slate-900"
            onClick={() => handlePrev()}
          >
            prev
          </button>
        )}
        <div
          className={`container recipes ${
            ((!recipes.length || error) || loading) && "flex justify-center items-center"
          } overflow-x-scroll`}
          onWheel={(e) => {
            if(error) return;
            document.body.style.overflow = "hidden";
            e.currentTarget.scrollLeft += e.deltaY;
          }}
          onMouseLeave={() => {
            if(error) return;
            document.body.style.overflow = "auto";
          }}
          onMouseUp={() => {
            if(error) return;
            document.body.style.overflow = "auto";
          }}
        >
          {recipes.length && !error && !loading ? (
            <div className="grid grid-cols-10 md:w-[2800px] w-[2000px] grid-rows-2 gap-2">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="col-span-1 row-span-1 p-1 rounded-md bg-slate-900 flex flex-col gap-2"
                >
                  <img
                    draggable="false"
                    className="w-full xl:h-48 lg:h-64 h-64 object-cover rounded-md"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <h3 className="text-md my-auto font-bold break-words text-center">
                    {`${recipe.title.substring(0, 60)}  ${
                      recipe.title.length >= 60 ? "..." : ""
                    }`}
                  </h3>
                </div>
              ))}
            </div>
          ) : error && !loading ? (
            <h4 className="text-sm cursor-not-allowed text-red-700 py-5 font-semibold text-center">
              {error}
            </h4>
          ) : (
            <AiOutlineLoading className="cursor-wait m-auto animate-spin w-8 h-8 text-white" />
          )}
        </div>
        {nextButton && (
          <button
            className="min-h-full cursor-pointer hover:bg-slate-900 px-1 rounded-r-xl border border-slate-900"
            onClick={() => handleNext()}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default Recipes;
