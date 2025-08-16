import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";


const BackButton = () => {
    const navigate = useNavigate();

  return (
    <button onClick={()=>{
        navigate(-1);
    }} className=' absolute top-4 left-4 btn btn-primary md:text-2xl'> <IoMdArrowRoundBack/> </button>
  )
}

export default BackButton;