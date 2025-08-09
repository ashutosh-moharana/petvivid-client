import { useState } from "react";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here"
                    className="textarea textarea-bordered h-32 w-full resize-none focus:outline-none focus:border-primary"
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </form>

              <div className="divider my-8">OR</div>

              <div className="text-center space-y-4">
                <h3 className="font-semibold text-lg">Other ways to reach me:</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Email:</span> 
                     {" "}ashutoshmoharana00@gmail.com
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> +91 9937727738
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> Puri, Odisha, 752109
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;