import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handlePostPet = () => {
      if (email) {
        navigate("/login", { state: { email } });
      }
    };

  return (
    <div className="hero flex-1 h-full px-4 sm:px-6 md:px-8">
      <div className="hero-content flex flex-col-reverse md:flex-row h-full py-6 md:py-12 gap-8 md:gap-12">
        <div className="h-full md:w-1/2 flex flex-col justify-center space-y-4 md:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide leading-tight md:leading-14">
            Helping Reunite Lost Pets With Their Families...
          </h1>
          <p className="text-sm sm:text-base text-gray-600 tracking-tight leading-relaxed">
            PetVivid Is the web platform that connects people to help reunite
            lost and found pets. Users can post details of missing or found
            animals , browse posts in their area and contact pet owners or
            finders. It is a simple way to spread awareness and bring kids back
            home faster.
          </p>

          {!isLoggedIn && (
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2 mt-2 sm:mt-4">
              <input
                type="email"
                className="input input-bordered w-full text-base"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                className="btn btn-primary w-full sm:w-auto text-base px-6"
                onClick={handlePostPet}
              >
                Post a Pet
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 w-full md:w-1/2">
          <img
            src="./hero_image.webp"
            className="w-full h-auto max-h-[300px] md:max-h-[400px] object-contain object-center"
            alt="Hero illustration of pets"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
