import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiPlay } from "react-icons/fi";
import Logo from "../../src/components/assets/image/Logo.png"

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Hero */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop')",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img
            src={Logo}
            alt="Delish"
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full shadow-2xl"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 drop-shadow">
            Hungry? <span className="text-pink-600">We deliver</span> happiness.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Craving biryani, pizza, sushi or momos? 2,000+ restaurants are a tap away.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="group inline-flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-pink-700 transition-all hover:scale-105"
            >
              <FiSearch className="text-xl group-hover:rotate-90 transition-transform" />
              Explore Restaurants
            </Link>
            <button className="inline-flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-full font-bold shadow-lg ring-1 ring-pink-200 hover:ring-pink-400 transition">
              <FiPlay className="text-xl" />
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why Delish?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Lightning-fast delivery, real-time tracking, and exclusive deals—every single day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShoppingCart className="w-10 h-10 text-pink-600" />,
                title: "Order in 3 Taps",
                desc: "Save addresses & payments, reorder in seconds.",
              },
              {
                icon: <FiUser className="w-10 h-10 text-pink-600" />,
                title: "Personalised Feed",
                desc: "AI picks dishes you’ll love based on your taste buds.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Flash Delivery",
                desc: "Average 28-minute delivery from the best kitchens in town.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-pink-600 py-16 px-4 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "2M+", label: "Happy Customers" },
            { value: "2,000+", label: "Partner Restaurants" },
            { value: "28 min", label: "Avg Delivery Time" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-bold">{s.value}</div>
              <div className="text-pink-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to order?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Download the app or dive in on the web—your next meal is waiting.
          </p>
          <Link
            to="/restaurants"
            className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-pink-700 transition hover:scale-105"
          >
            Start Ordering
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <img src={Logo} alt="Delish" className="w-12 h-12 mx-auto mb-4" />
          <p className="text-gray-400">
            © {new Date().getFullYear()} Delish Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;