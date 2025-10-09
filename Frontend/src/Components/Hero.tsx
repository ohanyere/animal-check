import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";
import useAuthStatusChange from "../hooks/useAuthStatusChange";
import Htext from "../utltis/Htext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const Hero = () => {
    const {authStatus} = useAuthStatusChange()
    const navigate = useNavigate()
    const {t} = useTranslation()
    const handleNavigate = () : void => {
        
        authStatus  ? navigate("/dash-board") : navigate("/sign-in")
    }
    return ( 
        <>
        <section className="sm:h-screen h-[40rem] w-full z-10 mt-[8rem]">
            <div className="mx-auto w-5/6 mb-8 ">
                <div className="flex mb-8 flex-col items-center justify-center space-y-3 text-dark-green-20 text-center">
            <motion.div
            initial = "hidden"
            whileInView="visible"
            
            viewport={{once :true, amount:0.5}}
            transition={{duration: 0.5}}
            variants={{
              hidden : {opacity : 0, x:-50},
              visible : {opacity : 1, x: 1}
            }}
          
          >
                    <Htext  className="mb-4 w-full text-3xl md:text-[2.7rem] leading-normal  font-dmsans text-[#16a34a]">{t("heroText")} <br/>{t("justPhoto")}</Htext>
                    <p className=" text-md md:text-[1.3rem] md:mb-5 text-center ">{t("sheroText")} <br /> {t("heroTextComplete")}</p>
                    </motion.div>
                    </div>
                    <motion.div 
              initial = "hidden"
              whileInView="visible"
              viewport={{once :true, amount:0.5}}
              transition={{delay: 0.2,duration: 0.5}}
              variants={{
                hidden : {opacity : 0, x:-50},
                visible : {opacity : 1, x: 1}
              }}
            className="flex gap-8 items-center mt-8"
            >
                    <div className="md:w-3/5 w-full justify-center mx-auto flex gap-5  md:flex-row flex-col">
                        <Button 
                            onClick={handleNavigate}
                            className="py-4 w-12- md:px-10 bg-[#0A8050] text-white font-semibold space-y-5 rounded-md  capitalize md:text-xl text-sm transition duration-300 hover:bg-[#0A8080]"
                        > 
                           {t("getstarted")}
                        </Button>
                        <Button 
                            className="py-4  px-10 bg-white rounded-lg capitalize text-md md:text-xl"
                        > 
                           {t("works")}
                            
                        </Button>
                    </div>
                    </motion.div>
            </div>

        </section>
        
        </>
     );
}
 
export default Hero;

// import Button from "./Button/Button";
// import { useNavigate } from "react-router-dom";
// import useAuthStatusChange from "../hooks/useAuthStatusChange";
// import Htext from "../utltis/Htext";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";

// const Hero = () => {
//   const { authStatus } = useAuthStatusChange();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleNavigate = (): void => {
//     authStatus ? navigate("/dash-board") : navigate("/sign-in");
//   };

//   return (
//     <section className="md:py-28 py-32 mt-3 w-full z-10 bg-[#f5f5ee]">
//       <div className="mx-auto w-5/6 mb-8 text-center">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.5 }}
//           variants={{
//             hidden: { opacity: 0, x: -50 },
//             visible: { opacity: 1, x: 0 },
//           }}
//         >
//           <Htext className="mb-4 w-full text-3xl md:text-[2.7rem] leading-normal font-dmsans text-[#16a34a]">
//             {t("heroText")} <br />
//             {t("justPhoto")}
//           </Htext>
//           <p className="text-md md:text-[1.3rem] md:mb-5 text-center text-gray-700 ">
//             {t("sheroText")} <br /> your animals and save money.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           variants={{
//             hidden: { opacity: 0, x: -50 },
//             visible: { opacity: 1, x: 0 },
//           }}
//           className="flex gap-5 justify-center mt-8 flex-col md:flex-row items-center md:w-3/5 w-full"
//         >
//           <Button
//             onClick={handleNavigate}
//             className="py-4 px-10 md:px-12 bg-[#16a34a] text-white w-full font-semibold rounded-md capitalize text-sm md:text-xl hover:bg-[#13823d]"
//           >
//             Get Started Free
//           </Button>

//           <Button
//             className="py-4 px-10 md:px-12 bg-white border w-full border-gray-300 rounded-md capitalize text-sm md:text-xl text-[#16a34a] hover:bg-gray-100"
//           >
//             See How It Works
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
