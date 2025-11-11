import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    const {t} = useTranslation()
    let date = new Date()
    

    return ( 
<section className="w-full  bg-dark-green-20 py-8">
    <div className="mx-auto w-[95%]   mt-8 ">
        <div className=" flex flex-col gap-6 mx-auto w-[90%]  ">
            <div className="">
               <div className="flex gap-14 justify-between">
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
                <div className="space-y-4  bg-ble-300">
                    
                    <div>
                    <Link
                        to="/"
                        >
                                    <h2 className="font-bold text-2xl text-white ">{t("livestockDiseaseDetector")}</h2>
                    </Link>
                </div>
                <h3 className="text-[] text-md text-white">{t("helperFooterDes")}</h3>
                <div className="flex gap-4 font-bold pb-24 text-white "><a className="hover:text-orange-200" href=""><Facebook /></a> <a className="hover:text-orange-200" href=""><Twitter /></a> <a className="hover:text-orange-200" href=""><Linkedin/></a></div>
                
                </div>
                </motion.div>
                 <div className="flex md:flex-row justify-between flex-col md:gap-14 gap-6 space-y-  text-[#f8f4eb] capitalize">
                    
                    <div className="flex flex-col space-y-4  w-44">
                          
                        <h3 className="font-semibold text-white">{t("Service")}</h3>
                        <Link to="/contact-us" className="text-white ">{t("Diagnosenow")}</Link>
                        
                    </div>
                    
                    <div className="flex flex-col space-y-2 capitalize  w-44">
                        <h3 className="font-semibold font-montserrat">{t("Company")}</h3>
                        <Link to="/contact-us"  className="text-white hover:text-orange-200 text-sm">{t("about")}</Link>
                        <Link to="/contact-us" className="text-white hover:text-orange-200 text-sm">{t("testimonials")}</Link>
                        <Link to="/contact-us" className="text-white hover:text-orange-200 text-sm">{t("contactUs")}</Link>
                    </div>
                      <motion.div
                                initial = "hidden"
                                whileInView="visible"
                                
                                viewport={{once :true, amount:0.5}}
                                transition={{duration: 0.5}}
                                variants={{
                                  hidden : {opacity : 0, x:50},
                                  visible : {opacity : 1, x: 1}
                                }}
                              
                              >
                     <div className="flex flex-col space-y-2 capitalize  w-44">
                        <h3 className="font-semibold">{t("Legal")}</h3>
                        <Link to="/contact-us" className=" text-sm hover:text-orange-200">{t("TermsofService")}</Link>
                        <Link to="/contact-us" className=" text-sm hover:text-orange-200">{t("PrivacyPolicy")}</Link>
                    </div>
                    </motion.div>
                 </div>
               </div>
               
            </div>
            <div className="w-full mx-auto md:h-10 h-20     border-t-2 flex items-end border-[#676f75]">
                <div className="flex flex-col md:flex-row justify-be md:gap-8 gap-2  items-center text-sm text-white"><span>{date.getFullYear()} helper, Inc</span>  <span>sayhi@helper.com</span></div>
            </div>
        </div>
    </div>
</section>
     );
}
 
export default Footer;