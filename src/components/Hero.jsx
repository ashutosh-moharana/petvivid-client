import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-16 px-4 sm:px-0">
      {/* Background Effects - adjusted for mobile */}
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-[80px] sm:blur-[128px] pointer-events-none"></div>

      <div className="container mx-auto z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Reuniting Pets with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              Loving Families
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed px-2 sm:px-0">
            A community-driven platform to help lost pets find their way home.
            Share alerts, connect with neighbors, and bring them back safely.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
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
      </div>
    </div>
  );
};

export default Hero;
