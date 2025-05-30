// AboutUs.jsx
import React from 'react';
import { FaMapMarkerAlt, FaHome, FaShieldAlt, FaUsers, FaStar } from 'react-icons/fa';
// import buildingImage from '../assets/ekam-building.jpg';
// import frontViewImage from '../assets/ekam-front-view.jpg';

const AboutUs = () => {
  const features = [
    {
      icon: <FaMapMarkerAlt className="text-3xl mb-4 text-blue-600" />,
      title: "Prime Location",
      items: [
        "Near recreational parks and nature trails",
        "Serene environment with scenic views",
        "Nairobi's Metropoitan diaspora",
        "Walking distance to Kiserian town",
        "Near schools, hospitals, and shopping",
        "Easy access to Magadi Road amenities"
      ]
    },
    {
      icon: <FaHome className="text-3xl mb-4 text-blue-600" />,
      title: "Quality Homes",
      items: [
        "Spacious bedsitters, one, and two-bedroom apartments",
        "Modern finishes and ample natural light",
        "Thoughtful layouts for comfortable living",
        "Regular maintenance and upgrades"
      ]
    },
    {
      icon: <FaShieldAlt className="text-3xl mb-4 text-blue-600" />,
      title: "Community Amenities",
      items: [
        "Landscaped gardens and outdoor spaces",
        "Children's play area",
        "24/7 security with CCTV monitoring",
        "Reliable water and backup power",
        "Ample parking space"
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Living at Ekam Apartments has been wonderful. The peaceful environment combined with modern amenities makes it perfect for my family. The management is always responsive to our needs.",
      author: "The Wanjiru Family",
      tenure: "Tenants since 2024"
    },
    {
      quote: "As a young professional working in Nairobi, Ekam offers the perfect balance - close enough to the city but far enough to enjoy Kiserian's tranquility. The security gives me peace of mind.",
      author: "James Mwangi",
      tenure: "Tenant since 2024"
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
    <div 
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80)` }}
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ekam Apartments</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
        Your Serene Home Along Magadi Road in Kiserian
        </p>
      </div>
    </div>

      {/* Our Story Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 relative after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-blue-600">
          Our Story
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <p className="text-lg mb-6">
              Founded in 2024, Ekam Apartments was born from a vision to create exceptional living spaces that blend urban convenience with the tranquil beauty of Kiserian. Our name "Ekam" (meaning "unity" in Sanskrit) reflects our commitment to building a harmonious community.
            </p>
            <p className="text-lg">
              Located along the scenic Magadi Road, we've grown from a single building to Kiserian's premier residential community, serving families, professionals, and students who appreciate quality, convenience, and comfort.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
              alt="Ekam Apartments front view" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 relative after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-blue-600">
            Why Choose Ekam Apartments?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                </div>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-blue-600">
          The Ekam Experience
        </h2>
        
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="italic text-lg mb-6">"{testimonial.quote}"</p>
              <div className="font-bold">{testimonial.author}</div>
              <div className="text-gray-600">{testimonial.tenure}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Call Ekam Home?</h2>
          <p className="text-xl mb-8">
            We're currently welcoming new tenants for our available units. Schedule a viewing today!
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;