import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hamburger, setHamburger] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const Links = [
    "home", "popular", "recipes", "ingredient",
  ]

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", (e) => {
      setWidth(e.target.innerWidth)
    })

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if(width >= 463){
      setHamburger(false)
    }
  }, [width])

  return (
    <nav className={`flex z-[9999] justify-center fixed duration-300 ${(scrolled || hamburger) && 'bg-black'} text-white top-0 left-0 right-0`}>
      <div className={`flex justify-between items-center duration-300 ${scrolled || hamburger ? 'py-5 xs:py-0' : 'py-5'} flex-wrap container px-5 md:px-20`}>
        <a href="#">
          <h1 className="text-4xl font-mono font-extrabold uppercase italic">
            Logo
          </h1>
        </a>
        {width<463 && (hamburger ? (
          <IoCloseOutline className="text-3xl cursor-pointer" onClick={() => setHamburger(false)} />
          ) : (
            <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={() => setHamburger(true)} />
        ))}
        <div className={`flex xs:flex-row xs:static xs:px-0 px-5 xs:bg-transparent bg-black absolute duration-300 ${hamburger ? "top-[100%]" : "top-[-150px]"} left-0 right-0 flex-col gap-2 py-3 xs:gap-10 text-md text-sm xs:items-center`}>
          {Links.map((link, i) => (
            
          <a className={`hover:scale-y-110 capitalize py-3 ${activeLink === link ? "scale-y-110 font-medium" : ""}`} key={i} href={`#${link}`} onClick={() => setActiveLink(link)}>
            {link}
          </a>
          ))}
          <a href="#contact" className="z-10">
            <button className="border my-2 xs:my-0 px-5 py-2 relative duration-300 hover:text-black button-navbar">Contact</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
