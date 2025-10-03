// // backend/controller/diagnoseService.js
// import { diagnoseImage } from "../services/diagnoseImage.js";

// export const diagnoseService = async (req, res) => {
//   try {
//     const { imageUrl, description } = req.body;
//     const result = await diagnoseImage(imageUrl, description);
//     res.json({ success: true, data: result });
//   } catch (error) {
//     console.error("Diagnosis failed:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


import { analyzeLivestock } from "../services/diagnoseImage.js";

 const diagnoseLivestock = async (req, res) => {
  try {
    const   imageUrl  = req.body.imageUrl;
    const  description  = req.body.description;

    if(!imageUrl){
        res.status(400)
        throw new Error("Image  is required")
    }
    

    const result = await analyzeLivestock(imageUrl, description);

    res.json(result);
  } catch (err) {
    res.status(500)
    throw new Error(`${err.message || "something went wrong"}`)
  }
};

export default diagnoseLivestock
