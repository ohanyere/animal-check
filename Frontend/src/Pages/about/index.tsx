import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import maletestimonial from "../../assets/maletestimonial.png";

const About = () => {
  return (
    <>
      {/* Hero Section 
      <section className="bg-[#0A8080] text-white">
        <div className="h-64 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold capitalize"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 text-lg md:text-xl opacity-90"
          >
            Discover who we are and what we do
          </motion.p>
        </div>
      </section> */}

      {/* Content Section */}
      <section className="bg-[#f8f9fa] py-16 px-6 mt-[4rem]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What We Do
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold text-[#0A8080]">Husky</span>, we
              strive to provide innovative solutions that make life easier and
              more enjoyable. Our team is dedicated to delivering
              high-quality services tailored to meet the unique needs of our
              clients.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are committed to excellence, creativity, and customer
              satisfaction. Whether it's web development, branding, or digital
              marketing, we aim to exceed expectations and bring ideas to life.
            </p>
            <Button className="cursor-pointer text-lg bg-[#0A8080] hover:bg-[#2c6a8f] rounded-md text-white py-3 px-10 shadow-lg transition-all duration-300">
              Know More
            </Button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={maletestimonial}
              alt="Husky Team"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>


    </>
  );
};

export default About;
