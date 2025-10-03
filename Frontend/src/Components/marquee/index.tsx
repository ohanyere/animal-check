import oldosponsor from "../../assets/oldosponsor.png";
import Marquee from "react-fast-marquee";

const sponsors = [
  oldosponsor,
  oldosponsor,
  oldosponsor,
  oldosponsor,
  oldosponsor,
];

const Maquee = () => {
  return (
    <section className="relative overflow-hidden md:mb-5 py-6">
      
      <div className="absolute left-0 top-0 h-full w-[15%] z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      
      
      <div className="absolute right-0 top-0 h-full w-[15%] z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

 
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <div className="flex items-center gap-10">
          {sponsors.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="Sponsor"
              className="h-32 w-32 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Maquee;
