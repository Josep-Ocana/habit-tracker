const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between bg-gray-800 text-white p-8 text-center text-sm mt-auto">
      <div className="mx-auto">
        <p>
          &copy; {new Date().getFullYear()} **Todo List App** . Todos los
          derechos reservados.
        </p>
        <p className="mt-1">
          Desarrollado por:
          <a
            target="_blank"
            href="https://github.com/Josep-Ocana"
            className="text-gray-500 hover:underline transition duration-300 ml-1"
          >
            Josep Ocaña Puigdevall
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
