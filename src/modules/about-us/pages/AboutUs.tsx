import { useEffect } from "react";
import Student from "../../../assets/img/icons-img/student.png";
import Category from "../../../assets/img/icons-img/category.png";
import Video from "../../../assets/img/icons-img/video.png";
import BackgroundImage from "../../../assets/img/fondo-about.jpg"; // Asegúrate de tener una imagen de fondo
import BackgroundImageAboutme from "../../../assets/img/aboutme.svg"; // Asegúrate de tener una imagen de fondo

export const AboutUs = () => {
  useEffect(() => {
    document.title = "Acerca de JHEWEKEEND - Cursos Virtuales";
  }, []);

  return (
    <>
      {/* Nueva sección con imagen de fondo */}
      <div
        className="relative w-full h-screen-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <section className="text-justify max-w-7xl mx-auto mt-12 py-0 px-5">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 mt-12">
          {/* Imagen */}
          <img
            className="md:w-1/2"
            src={BackgroundImageAboutme}
            alt="Imagen JHEWEKEEND"
          />
          {/* Contenido de texto */}
          <div className="md:w-1/2 pt-4">
            <h2 className="text-4xl mb-3 font-bold text-primary uppercase">
              ¿Quienes somos?
            </h2>
            <p className="text-white">
              Una plataforma educativa dedicada a ofrecer cursos virtuales de
              alta calidad en diversas áreas del conocimiento. Nuestro objetivo
              es facilitar el aprendizaje accesible y flexible para todos,
              proporcionando contenido educativo actualizado y recursos
              prácticos.
              <br />
              Nuestra pasión por la educación nos impulsa a colaborar con
              instructores expertos para crear cursos que sean tanto
              informativos como inspiradores.
            </p>

            {/* Estadísticas */}
            <div className="flex flex-wrap mt-6">
              <div className="w-full md:w-1/2 lg:w-1/3 pr-2">
                <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                  <img
                    src={Student}
                    alt="Icono de estudiantes"
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#021E40]">3,000+</h3>
                  <p className="text-gray-600">Estudiantes matriculados</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 pr-2">
                <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                  <img
                    src={Video}
                    alt="Icono de clases en vivo"
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#021E40]">2.4k+</h3>
                  <p className="text-gray-600">Clases Diarias en Vivo</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                  <img
                    src={Category}
                    alt="Icono de lecciones en video"
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#021E40]">3.3M</h3>
                  <p className="text-gray-600">Material y lecciones en vídeo</p>
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
            <p className="text-white">
              "Nuestra misión es proporcionar cursos virtuales innovadores y de
              calidad, que inspiren el aprendizaje continuo y el desarrollo
              personal y profesional de nuestros estudiantes en todo el mundo."
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl mb-3 font-bold text-primary uppercase">
              Visión
            </h3>
            <p className="text-white">
              "Nuestra visión es convertirnos en líderes globales en la
              educación online, ofreciendo una plataforma integral donde los
              estudiantes puedan acceder a cursos diversos y relevantes que
              impulsen su crecimiento y transformación personal."
            </p>
          </div>
        </div>
        {/* Misión y Visión */}
      </section>
    </>
  );
};
