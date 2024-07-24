import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <>
      <section className="h-[640px] bg-hero bg-no-repeat bg-center bg-cover py-24 mt-20">
        <div className="container mx-auto flex justify-around h-full">
          {/* texto */}
          <div className="flex flex-col ">
            <div className="font-semibold flex items-center uppercase text-[#25a25d]">
              <div className="w-10 h-[3px] bg-[#25a25d] mr-3"></div>Come rico y
              saludable!
            </div>
            <h1 className="w-full text-[70px] leading-[1.1] mb-4  font-bold">
              El yogurt que transforma tus
              <span className="font-semibold"> momentos</span>
            </h1>
            <Link
              to={"/products"}
              className="self-start uppercase font-semibold text-[#fff] border-2 border-[#373739] rounded-md px-4 py-2 bg-[#373739] transition-colors duration-300 hover:bg-[#373739] hover:text-white"
            >
              Descubrir más
            </Link>
          </div>
          {/* imagen */}
          <div className="hidden lg:block lg:w-1/2 lg:mr-20"></div>
        </div>
      </section>
    </>
  );
};
