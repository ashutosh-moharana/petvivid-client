import { Link } from "react-router-dom";
import { MdPets, MdLocationOn, MdSearch } from "react-icons/md";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-16 px-4 sm:px-0">
      {/* Background Effects - adjusted for mobile */}
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-[80px] sm:blur-[128px] pointer-events-none"></div>

      <div className="container mx-auto z-10 py-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Image Section - Shows first on mobile, second on desktop */}
          <div className="relative md:hidden md:order-2 flex items-center justify-center mb-8">
            <div className="relative w-full max-w-sm">
              {/* Gradient Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent rounded-3xl blur-2xl"></div>
              
              {/* Image Container */}
              <div className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/heropng.webp" 
                  alt="Happy pets" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="text-center md:text-left space-y-6 sm:space-y-8 md:order-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Reuniting Pets with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Loving Families
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-text-muted max-w-2xl md:max-w-none font-light leading-relaxed">
              A community-driven platform to help lost pets find their way home.
              Share alerts, connect with neighbors, and bring them back safely.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4 pt-6 sm:pt-8">
              <Link
                to="/signup"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-base sm:text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] w-full sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-surface hover:bg-surface-hover border border-border text-white rounded-full font-bold text-base sm:text-lg transition-all w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image Section - Desktop only */}
          <div className="relative hidden md:flex items-center justify-center md:order-2">
            <div className="relative w-full">
              {/* Gradient Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent rounded-3xl blur-2xl"></div>
              
              {/* Image Container */}
              <div className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/heropng.webp" 
                  alt="Happy pets" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
