import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { getRandomOneFood } from "../services/food.servise";
import TrackVisibility from "react-on-screen";

const Hero = () => {
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Recipes", "Ingredient Detail"];
  const [loopNum, setLoopNum] = useState(0);
  const [randomFood, setRandomFood] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getRandomOneFood()
      .then((data) => setRandomFood(data))
      .catch((data) => setError(data));
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(300 - Math.random() * 100);
    }
  };
  return (
    <div
      className="min-h-screen flex justify-center items-center hero bg-cover bg-fixed bg-center"
      id="home"
    >
      <div className="w-full min-h-[400px] flex justify-evenly h-full sm:flex-nowrap flex-wrap items-center px-10 gap-10 pt-24">
        <TrackVisibility className="max-w-2xl z-[1] w-full">
          {({ isVisible }) => (
            <div className={`w-full ${isVisible ? "animate__animated animate__fadeIn animate__slower" : ""}`}>
              <p className="text-xl rounded-sm font-bold tracking-wider px-2 py-3 bg-black border boredr-white text-white inline-block">
                Welcome to my food
              </p>
              <h1 className="text-[3.2rem] text-white font-extrabold">
                Serving {text}
              </h1>
              <p className="tracking-wide text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
                id aspernatur fugit quidem, soluta ab harum voluptas obcaecati
                adipisci nesciunt odio, delectus voluptatem provident deleniti
                ducimus minus sed reprehenderit et!
              </p>
            </div>
          )}
        </TrackVisibility>
        <TrackVisibility className="max-w-md z-[1] w-full randomfood">
          {({ isVisible }) => (
            <div
              className={`${
                isVisible
                  ? "animate__animated animate__zoomInDown animate__slower"
                  : ""
              } bg-black flex flex-col gap-3 p-3 rounded-md`}
            >
              <h2 className="text-2xl text-white bg-slate-900 font-extrabold border border-white rounded text-center py-1">
                Random Food
              </h2>

              <div className="rounded flex flex-col border border-white justify-center items-center bg-slate-900 overflow-hidden">
                {Object.keys(randomFood).length && !error ? (
                  <>
                    <img
                    draggable="false"
                      src={randomFood.image}
                      className="w-full h-48 object-center object-cover"
                      alt=""
                    />
                    <h3 className="text-xl text-white py-2 font-bold text-center">
                      {randomFood.title}
                    </h3>
                  </>
                ) : error ? (
                  <h4 className="text-sm cursor-not-allowed text-red-700 py-5 font-semibold text-center">
                    {error}
                  </h4>
                ) : (
                  <AiOutlineLoading className="cursor-wait animate-spin my-5 w-8 h-8 text-white" />
                )}
              </div>
            </div>
          )}
        </TrackVisibility>
      </div>
    </div>
  );
};

export default Hero;
