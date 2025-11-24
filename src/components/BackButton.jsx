import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border text-text-muted hover:text-white hover:border-primary transition-all duration-200 ${className}`}
      aria-label="Go back"
    >
      <MdArrowBack size={20} />
    </button>
  );
};

export default BackButton;