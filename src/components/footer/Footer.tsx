import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsGithub,
  BsWhatsapp,
  BsGlobe,
} from "react-icons/bs";
import logo from "../../assets/img/logo.png";

export const Footer: React.FC = () => {
  const whatsappNumber = "983805438";
  const whatsappMessage = "Bienvenido a JHACADEMY";
  const whatsappLink = `https://wa.me/51${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <footer className="py-12 bg-[#373739] text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo" className="mb-4 w-16" />
          <p className="mb-4">Con YOGURT MAFER estas usando</p>
          <button className="bg-[#1a202c] text-white py-2 px-4 rounded inline-flex items-center">
            <BsGlobe className="mr-2" />
            SOLES
          </button>
        </div>

        <div>
          <h3 className="font-bold mb-4">AGROINDUSTRIAS MAFER</h3>
          <ul>
            <p>
              Somos la empresa que se dedica a la venta de yogurt en sus
              diferentes variedades, como yogures orgánicos con azúcar y sin
              azúcar, naturales y frutados. Además, ofrece servicios de
              mantenimiento, venta de insumos y equipos industriales.
            </p>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Conecta con JHACADEMY</h3>
          <ul>
            <li>
              <a href="#">Soporte al cliente</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Nuestros productos</h3>
          <ul>
            <li>
              <a href="#">Servicios para empresas</a>
            </li>
            <li>
              <a href="#">Canjea cupones</a>
            </li>
            <li>
              <a href="#">Sube a premium</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Contáctanos</h3>
          <ul>
            <li>
              <a href="">Abancay, Tamburco, Perú</a>
            </li>
            <li>
              <a href="#"> (+51) 914-570-122</a>
            </li>
            <li>
              <a href="#">RUC: 20604222339</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center mt-4 w-full">
        <div className="w-full h-[3px] bg-[#1A202C]"></div>
      </div>

      <div className="container mx-auto flex justify-between items-center mt-8">
        <p className="text-gray-400 text-sm">Lima - Perú | Abancay - Perú</p>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/JheysonJhair.AroneAngeles.2003?locale=es_LA"
            aria-label="Facebook"
          >
            <BsFacebook className="text-2xl text-white hover:text-gray-400" />
          </a>
          <a
            href="https://www.instagram.com/jheyson_jhair_aa/"
            aria-label="Instagram"
          >
            <BsInstagram className="text-2xl text-white hover:text-gray-400" />
          </a>
          <a
            href="https://www.linkedin.com/in/jheysonjhairpro/"
            aria-label="LinkedIn"
          >
            <BsLinkedin className="text-2xl text-white hover:text-gray-400" />
          </a>
          <a href="https://github.com/JheysonJhair" aria-label="GitHub">
            <BsGithub className="text-2xl text-white hover:text-gray-400" />
          </a>
          <a href={whatsappLink} aria-label="WhatsApp">
            <BsWhatsapp className="text-2xl text-white hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
