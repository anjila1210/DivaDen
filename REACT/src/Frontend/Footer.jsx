import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white px-3 py-0 font-sans">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between border-b border-gray-600 pb-6 mb-6 gap-8">
        {/* Subscription */}
        <div className="flex-1">
          <p className="text-base mb-2">Get special discount on your inbox</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 text-base border border-gray-300 rounded-l outline-none flex-1"
            />
            <button className="p-2 px-4 bg-pink-600 text-white rounded-r hover:bg-pink-700">
              SEND
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="flex-1">
          <p className="text-base mb-1">For any help, you may call us at</p>
          <p className="text-base mb-1">1800-267-4444</p>
          <p className="text-sm">
            (Monday to Saturday, 8AM to 10PM and Sunday, 10AM to 7PM)
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div>
          <h3 className="text-lg mb-2 text-pink-500">DivaDen</h3>
          <ul>
            {[
              "Who are we?",
              "Careers",
              "Authenticition"
            ].map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-2 text-pink-500">Help</h3>
          <ul>
            {[
              "Contact Us",
              "Frequently asked questions",
              "Cancellation & Return",
              "Shipping & Delivery",
            ].map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-2 text-pink-500">Inspire Me</h3>
          <ul>
            {["Beauty Book", "DivaDen Network", "Buying Guides"].map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-2 text-pink-500">Quick Links</h3>
          <ul>
            {["Offer Zone", "New Launches", "Sitemap"].map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg mb-2 text-pink-500">Top Categories</h3>
          <ul>
            {[
              "Makeup",
              "Skin",
              "Hair",
              "Health & Wellness",
              "Fragrance",
              "Natural",
            ].map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-gray-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
