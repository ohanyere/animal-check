import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";




const schema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const Contact = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

 
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      
      await fetch("https://formsubmit.co/df7745a5322c546d8ee0e3c107c40fb7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Message sent successfully!");
    } catch (err) {
      console.error(err);
      if(err instanceof Error) toast.error(`Failed to send message.`);
      toast.error(" Failed to send message.");
    }
  };

    
  

  return (
    <section className="bg-gray-50 ">  
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-[3rem] sm:mt-[9rem]">
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold text-gray-800">
            Contact livestock ai for Partnerships
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you’re a farmer, vet, or researcher, we’d love to hear from
            you. Share your feedback, report issues, or explore partnership
            opportunities.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-700">
              <Mail className="w-6 h-6 text-emerald-600" />
              <span>support@livestockDiseaseDetector.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <Phone className="w-6 h-6 text-emerald-600" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <span>San Francisco, CA – Husky AI Research Hub</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className={`w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-emerald-500"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`w-full mt-2 px-4 py-3 border  rounded-lg focus:ring-2 focus:outline-none ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-emerald-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Farm / Organization (optional)
            </label>
            <input
              {...register("organization")}
              type="text"
              placeholder="Husky Farms Ltd."
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Tell us about your needs, issues, or ideas..."
              className={`w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-emerald-500"
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
