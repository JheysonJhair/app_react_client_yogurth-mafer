import { Link } from "react-router-dom";
import model from "../../assets/img/mode.svg";

export const Hero = () => {
  return (
    <>
      <section className="h-[600px] bg-hero bg-no-repeat bg-center bg-cover py-24 mt-20">
        <div className="container mx-auto flex justify-around h-full">
          {/* texto */}
          <div className="flex flex-col justify-center">
            <div className="font-semibold flex items-center uppercase text-[#FBC451]">
              <div className="w-10 h-[3px] bg-[#FBC451] mr-3"></div>No postergues más tu educación. ¡Tu futuro te está esperando!
            </div>
            <h1 className="w-full text-[70px] leading-[1.1] font-light mb-4 uppercase">
              Aprende cursos con{" "}
              <span className="font-semibold">JHACADEMY 2024</span>
            </h1>
            <Link
              to={"/products"}
              className="self-start uppercase font-semibold border-b-2 text-[#74b0e3] border-[#74b0e3]"
            >
              Descubrir más
            </Link>
          </div>
          {/* imagen */}
          <div className="hidden lg:block lg:w-1/2 lg:mr-20">
          <img className="lg:w-full" src={model} alt="Imagen de portada" />
          </div>
        </div>
      </section>
    </>
  );
};
