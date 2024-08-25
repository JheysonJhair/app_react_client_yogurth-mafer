import { useEffect, useState } from "react";
import { BsPeople, BsClock, BsBox } from "react-icons/bs";
import BackgroundImage from "../../../assets/img/fondo-about.jpg";
import BackgroundImageAboutme from "../../../assets/img/aboutme.svg";

interface MarketCardProps {
  name: string;
  location: string;
  image: string;
}
const MarketCard: React.FC<MarketCardProps> = ({ name, location, image }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg my-4 bg-white dark:bg-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-primary-dark dark:text-white">{name}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">{location}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* Aquí puedes agregar más detalles o íconos si es necesario */}
      </div>
    </div>
  );
};

export const AboutUs = () => {
  const [markets, setMarkets] = useState([
    { id: 1, name: "Santa Cecilia", location: "Parque Micaela", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNrnCNvQHEbspBcPhBGRZYqdOxZgoIKYh5Qg&s" },
    { id: 2, name: "Super Mas", location: "Av. Arenas", image: "https://invyctaretail.com/wp-content/uploads/2023/04/modulo-check-out-L.webp" },
    { id: 3, name: "Almacenes Salazar", location: "Av. Nuñez", image: "https://perureports.com/wp-content/uploads/2017/04/tambo-lima-peru.png" },
    { id: 4, name: "Caserita", location: "Jr. Apurimac", image: "https://www.americaeconomia.com/sites/default/files/styles/1280x720/public/2024-03/000506340W.jpg?itok=gdP7zFNB" },

    { id: 5, name: "Caserita", location: "Tamburco", image: "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/242013428_4362827023811976_8213434457165442894_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cFnFUT-a1ewQ7kNvgER-IKZ&_nc_ht=scontent.fcuz2-1.fna&oh=00_AYCEA-3lGoSvPdKaXFkxuKDNJAu3ilvAZfufVF9Ddz5dCQ&oe=66D149F4" },
    { id: 6, name: "Caserita", location: "Las Americas", image: "https://lh5.googleusercontent.com/p/AF1QipPTB6uIAsP4HxNz6at9O4IuTbWta_gJIibn49DP=w650-h486-k-no" },
    { id: 7, name: "Gotiyo Market", location: "Las Americas", image: "https://comprarmaquinariahosteleria.com/blog/wp-content/uploads/2023/02/como-montar-tienda-alimentacion.jpg" },
    { id: 8, name: "Almacenes Santa Cecilia", location: "Jr. Cusco", image: "https://jpsystems.pe/wp-content/uploads/2021/07/Requisitos-para-iniciar-un-negocio-de-Minimarket-en-Peru.jpg" },
    { id: 9, name: "Copiadora Cielito", location: "Av. Peru", image: "https://img.freepik.com/vector-premium/ilustracion-vector-fachada-tienda-abarrotes-escaparate-edificio-tienda-vista-frontal-fachada-tienda-dibujos-animados-plana-eps-10_505557-737.jpg" },
  ]);

  useEffect(() => {
    document.title = "Acerca de Nosotros";
  }, []);

  return (
    <>
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` , height:"500px"}}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <section className="text-justify max-w-7xl mx-auto mt-12 py-0 px-5">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 mt-12">
          <img className="md:w-1/2" src={BackgroundImageAboutme} alt="Imagen" />
          <div className="md:w-1/2 pt-4">
            <h2 className="text-4xl mb-3 font-bold text-primary uppercase">
              ¿Quiénes somos?
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
              yogurths a nivel local y nacional, destacándonos por la
              calidad, innovación y compromiso con la salud y el bienestar de
              nuestros consumidores."
            </p>
          </div>
        </div>
        {/* Misión y Visión */}
        <h2 className="text-3xl font-bold text-center mb-6">Mercados en Abancay</h2>
        <p className="text-black">
          "Descubre los minimarkets en Abancay donde puedes encontrar una amplia variedad de nuestros productos. Cada mercado se destaca por ofrecer un excelente servicio al cliente y un ambiente agradable, haciendo de tus compras diarias una experiencia satisfactoria. ¡Explora nuestras opciones y encuentra el mercado más cercano a ti!"
        </p>
        <div className="flex flex-wrap justify-center gap-8 my-8 md:flex-nowrap md:grid md:grid-cols-3 md:gap-8">
          {markets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
      </div>
      </section>
    </>
  );
};
