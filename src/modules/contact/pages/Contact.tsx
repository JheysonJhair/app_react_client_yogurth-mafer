import { useState, useEffect } from "react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const formSubmitted = localStorage.getItem("formSubmitted");
    if (formSubmitted) {
      setFormSubmitted(true);
      localStorage.removeItem("formSubmitted");
    }
  }, []);

  //---------------------------------------------------------------- POST FORMSPREE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([name, lastName, email, message].includes("")) {
      setErrorInput(true);

      setTimeout(() => {
        setErrorInput(false);
      }, 5000);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formDataObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value as string;
    });

    try {
      await fetch("https://formspree.io/f/mdknlkll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      localStorage.setItem("formSubmitted", "true");
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">
        {errorInput && (
          <div className="bg-red-500 text-white font-medium text-center py-2 rounded mb-5">
            <strong>¡Error!</strong>
            <br />
            Tienes que llenar todos los campos.
          </div>
        )}
        {isFormSubmitted && (
          <div className="bg-green-500 text-white font-medium text-center py-2 rounded mb-5">
            ✅ ¡El formulario se envió correctamente! Gracias por tu mensaje.
          </div>
        )}
        <div className="text-center mb-10">
          <h3
            className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-white"
            style={{ color: "#373739" }}
          >
            Contá<span className="text-primary">ctanos</span>
          </h3>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nombre:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                name="name"
                type="text"
                placeholder="Ingrese su nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Apellidos:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-last-name"
                name="lastName"
                type="text"
                placeholder="Ingrese sus apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Correo Electrónico:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-email"
                name="email"
                type="email"
                placeholder="correo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="grid-message"
              >
                Mensaje:
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-message"
                name="message"
                placeholder="Ingrese su mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center w-full px-3">
              <button
                className="shadow bg-[#373739] hover:bg-[#646468] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
