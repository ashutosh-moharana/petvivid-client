const About = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          We Bring Families <br />
          <span className="text-primary">Together</span>
        </h2>
        <p className="text-xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
          PetVivid is more than just a platform; it's a community dedicated to the safety and happiness of our furry friends.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-surface border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-white mb-4">Report & Share</h3>
          <p className="text-text-muted leading-relaxed">
            Create detailed posts for lost or found pets instantly. Our platform ensures your alert reaches the local community quickly, maximizing the chances of a happy reunion.
          </p>
        </div>

        <div className="bg-surface border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-white mb-4">Connect & Support</h3>
          <p className="text-text-muted leading-relaxed">
            Join a network of compassionate pet lovers. Share updates, offer support, and work together to keep our pets safe. Every share counts in bringing a pet home.
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-20">
        <h3 className="text-3xl font-bold text-white mb-10 text-center">Why Choose PetVivid?</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Instant Alerts", desc: "Real-time posting for immediate visibility." },
            { title: "Community Driven", desc: "Powered by local pet lovers." },
            { title: "Secure Platform", desc: "Safe environment for sharing info." },
            { title: "Mobile Ready", desc: "Accessible anywhere, anytime." },
          ].map((item, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-4"></div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;