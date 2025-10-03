import { motion } from "framer-motion";
import Htext from "../../utltis/Htext";
import Benefit from "./Benefit";
import { Scan, Stethoscope, ShieldCheck } from "lucide-react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import maletestimonials from "../../assets/maletestimonial.png";
import femaleTestimonial from "../../assets/femaleTestimonial.png";
import { useTranslation } from "react-i18next";

export type BenefitProps = {
  icon: React.JSX.Element;
  title: string;
  description: string;
};

// Consistent icon size h-12 w-12



const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const Benefits = () => {
  
  const {t} = useTranslation()

  const benefits: BenefitProps[] = [
  {
    icon: <Scan className="h-12 w-12 text-[#16a34a]" />,
    title: t("instantDetectionTitle"),
    description: t("instantDetectionBoby"),
  },
  {
    icon: <Stethoscope className="h-12 w-12 text-[#16a34a]" />,
    title: t("instantDetectionTitle2"),
    description: t("instantDetectionBoby2"),
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-[#16a34a]" />,
    title: t("instantDetectionTitle3"),
    description: t("instantDetectionBoby3"),
  },
];

const testimonials = [
  {
    url: femaleTestimonial,
    text: t("testimonia1"),
  },
  {
    url: maletestimonials,
    text: t("testimonia2"),
  },
];

  return (
    <section className="w-full bg-[#f5f5ee] mb-28">
      <div id="benefits" className="mx-auto w-5/6 py-20">
        {/* Intro Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <Htext>{t("ProblemsWeSolve")}</Htext>
          <p className="my-5 text-center text-[1rem] md:text-md leading-relaxed text-gray-800">
            {t("problemsDes")}
          </p>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
          className="md:mt-8 flex flex-col md:flex-row gap-8 items-center md:mb-20"
        >
          {benefits.map((item) => (
            <Benefit
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </motion.div>

        {/* Testimonials Slider */}
        <div className="mt-20">
          <Swiper
            modules={[Pagination, Navigation, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            a11y={{ prevSlideMessage: "Previous testimonial", nextSlideMessage: "Next testimonial" }}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-10"
                >
                  <div
                    className="md:h-96 h-72 rounded-md md:w-[80%] w-[100%] mx-auto bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${t.url})` }}
                    aria-label="Testimonial user photo"
                  ></div>
                  <div className="my-2 text-center md:text-left text-sm md:text-lg w-[90%] mx-auto md:py-7 leading-relaxed text-gray-800">
                    {t.text}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

