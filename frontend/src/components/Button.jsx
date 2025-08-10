import { Link } from "react-router-dom";

const Button = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="bg-green-600 text-white px-5 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-green-700 transition shadow-md"
    >
      {text}
    </Link>
  );
};

export default Button;
