import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-gray-400">Our Mission</h2>
              <p className="text-lg mb-4 text-gray-600">
                At PetVivid, we’re dedicated to reuniting lost pets with their loving families. We believe every pet deserves a safe home and every owner deserves peace of mind. Our platform connects communities, making it easier and faster to find missing pets through shared posts, alerts, and support from fellow pet lovers.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-3 text-gray-400">Report & Share Lost/Found Pets</h3>
                <p className="text-gray-600">
                  If your pet is missing, create a detailed post with photos, location, and description. Found a wandering pet? Share their details to help them get home quickly. PetVivid ensures your post reaches the right people in your local and extended community..
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-3 text-gray-400">Connect with Helpers & Pet Lovers</h3>
                <p className="text-gray-600">
                  Join a compassionate network of pet owners, animal rescuers, and kind-hearted neighbors. Work together, exchange updates, and support each other in finding and caring for lost or found pets.


                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-gray-400">Key Features</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span>Lost & Found Pet Posts – Instantly share missing or found pet alerts with the community.</span>
                </li>
                <li className="flex items-start">
                  <span>Personal profile to showcase all your pet content</span>
                </li>
                <li className="flex items-start">
                  <span>Safe and secure platform for pet lovers</span>
                </li>
                <li className="flex items-start">
                  <span>Mobile-friendly interface for sharing on the go</span>
                </li>
              </ul>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default About;