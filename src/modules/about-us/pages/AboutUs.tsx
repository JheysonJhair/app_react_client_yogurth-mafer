import { useEffect } from "react";
import { BsPeople, BsClock, BsBox } from "react-icons/bs";
import BackgroundImage from "../../../assets/img/fondo-about.jpg";
import BackgroundImageAboutme from "../../../assets/img/aboutme.svg";

export const AboutUs = () => {
  useEffect(() => {
    document.title = "Acerca de Nosotros";
  }, []);

  return (
    <>
      <div
        className="relative w-full h-screen-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="absolute inset-0 opacity-50"></div>
      </div>

      <section className="text-justify max-w-7xl mx-auto mt-12 py-0 px-5">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 mt-12">
          <img className="md:w-1/2" src={BackgroundImageAboutme} alt="Imagen" />
          <div className="md:w-1/2 pt-4">
            <h2 className="text-4xl mb-3 font-bold text-primary uppercase">
              ¿Quienes somos?
            </h2>
            <p className="text-black">
              Mafer es una empresa dedicada a ofrecer yogurths de alta calidad,
              elaborados con ingredientes frescos y naturales. Nuestro objetivo
              es proporcionar productos que no solo sean deliciosos, sino
              también nutritivos, para satisfacer las necesidades de nuestros
              clientes.
              <br />
              <br />
              Nuestra pasión por la calidad y el sabor nos impulsa a trabajar
              con proveedores comprometidos y a utilizar procesos de producción
              que garantizan la frescura y el bienestar en cada envase.
            </p>

            {/* Estadísticas */}
            <div className="flex flex-wrap mt-6">
              <div className="w-full md:w-1/2 lg:w-1/3 pr-2">
                <div className="bg-[#FCDEDE] rounded-lg shadow-lg p-3 text-center">
                  <BsPeople className="w-8 h-8 mx-auto mb-4 text-[#021E40]" />
                  <h3 className="text-2xl font-bold text-[#021E40]">3,000+</h3>
                  <p className="text-gray-600">Clientes</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-2">
                <div className="bg-[#FCDEDE] rounded-lg shadow-lg p-3 text-center">
                  <BsClock className="w-8 h-8 mx-auto mb-4 text-[#021E40]" />
                  <h3 className="text-2xl font-bold text-[#021E40]">2+</h3>
                  <p className="text-gray-600">Años de experiencia</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="bg-[#FCDEDE] rounded-lg shadow-lg p-3 text-center">
                  <BsBox className="w-8 h-8 mx-auto mb-4 text-[#021E40]" />
                  <h3 className="text-2xl font-bold text-[#021E40]">3.3M</h3>
                  <p className="text-gray-600">Proveedores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 my-14">
          <div className="md:w-1/2">
            <h3 className="text-3xl mb-3 font-bold text-primary uppercase">
              Misión
            </h3>
            <p className="text-black">
              "Nuestra misión es ofrecer yogurths de la más alta calidad que
              brinden un sabor delicioso y beneficios nutricionales a nuestros
              clientes. Nos comprometemos a utilizar ingredientes frescos y
              naturales, garantizando la excelencia en cada producto que
              ofrecemos."
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl mb-3 font-bold text-primary uppercase">
              Visión
            </h3>
            <p className="text-black">
              "Nuestra visión es ser reconocidos como líderes en la industria de
              yogurths a nivel nacional e internacional, destacándonos por la
              calidad, innovación y compromiso con la salud y el bienestar de
              nuestros consumidores."
            </p>
          </div>
        </div>
        {/* Misión y Visión */}
      </section>
    </>
  );
};
