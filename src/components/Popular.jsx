import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getRandomTenFood } from "../services/food.servise";
import { AiOutlineLoading } from "react-icons/ai";

const Popular = () => {
  const [randomFood, setRandomFood] = useState([]);
  const [error, setError] = useState("");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    getRandomTenFood()
      .then((data) => setRandomFood(data))
      .catch((data) => setError(data));
  }, []);

  return (
    <div className="bg-black flex justify-center px-5" id="popular">
      <div className="rounded-3xl max-w-5xl my-10 bg-slate-900 w-full">
        <div className="py-10 px-6 text-center text-white flex flex-col gap-5">
          <h1 className="text-4xl font-bold">Popular</h1>
          <p className="text-md font-medium">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
            esse assumenda quos cumque recusandae earum, commodi doloremque vero
            saepe facilis itaque enim corrupti voluptas incidunt provident
            excepturi aliquid. Non, quaerat.
          </p>
          <div className="flex justify-center items-center min-h-36">
            {randomFood.length && !error ? (
              <Carousel
                responsive={responsive}
                infinite={true}
                className={`owl-carousel owl-theme skill-slider w-full max-w-lg xs:max-w-full ${
                  !randomFood.length && "justify-center"
                }`}
              >
                {randomFood.map((food) => (
                  <div className="item px-5" key={food.id}>
                    <div className="bg-black rounded-md overflow-hidden">
                      <img
                        draggable="false"
                        src={food.image}
                        alt={`${food.title.substring(0, 50)}  ${
                          food.title.length >= 50 ? "..." : ""
                        }`}
                        className="w-full lg:h-36 xs:h-52 h-60 object-cover"
                      />
                      <div className="px-1 min-h-16 p-2 font-bold">
                        <h1 className="text-md my-auto text-white break-words">
                          {`${food.title.substring(0, 50)}  ${
                            food.title.length >= 50 ? "..." : ""
                          }`}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : error ? (
              <h4 className="text-sm cursor-not-allowed text-red-700 py-5 font-semibold text-center">
                {error}
              </h4>
            ) : (
              <AiOutlineLoading className="cursor-wait m-auto animate-spin w-8 h-8 text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
