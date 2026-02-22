import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SavingsIcon from "@mui/icons-material/Savings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About SHOPEASE
          </h1>
          <p className="mt-6 text-lg text-indigo-100 leading-relaxed">
            Everything Your Home Needs, Made Easy.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-6">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>SHOPEASE</strong> is an Indian online store for kitchen essentials,
            home décor, storage solutions, and everyday household products designed for
            modern homes. We curate practical, durable, and value-for-money items that
            simplify daily life and enhance your living space.
          </p>

          <p className="text-gray-600 leading-relaxed">
            From smart kitchen tools to stylish home accessories, every product is
            selected for quality, functionality, and ease of use.
          </p>
        </div>

        {/* BRAND CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
          <StorefrontIcon style={{ fontSize: 60 }} className="text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Built for Modern Homes
          </h3>
          <p className="text-gray-500 text-sm">
            Practical solutions that make your daily routines simpler,
            faster, and smarter.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-12">
            Why Choose SHOPEASE
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <Feature
              icon={<VerifiedIcon fontSize="large" />}
              title="Quality Assured"
              desc="Every product is carefully selected and tested for durability and performance."
            />

            <Feature
              icon={<SavingsIcon fontSize="large" />}
              title="Value Pricing"
              desc="Transparent pricing with no hidden costs — best value for every purchase."
            />

            <Feature
              icon={<LocalShippingIcon fontSize="large" />}
              title="Reliable Delivery"
              desc="Fast and dependable shipping across India with secure packaging."
            />

            <Feature
              icon={<SupportAgentIcon fontSize="large" />}
              title="Customer First"
              desc="Responsive support team ready to assist you whenever needed."
            />

          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Our Mission
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          We specialize in home and lifestyle products, offering secure online shopping,
          transparent pricing, and dependable delivery across India. At <strong>SHOPEASE</strong>,
          we make home upgrades simple, affordable, and stress-free — because your home
          should work for you, not the other way around.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Upgrade Your Home Today
        </h2>
        <p className="text-indigo-100 mb-8">
          Discover products designed to make life easier and your space better.
        </p>

        <a
          href="/"
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
        >
          Start Shopping
        </a>
      </section>

    </div>
  );
}

/* FEATURE CARD COMPONENT */
function Feature({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl border bg-gray-50 hover:bg-indigo-50 transition text-center">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}