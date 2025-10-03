import axios from  "axios"
const Api_Url = "http://localhost:5000/api/diagnose"

type props = {
    imageUrl : string,
    description : string
}
export const postData  = async({imageUrl, description} : props) : Promise<any>  =>   {
    const formData = new FormData()
    formData.append("imageUrl", imageUrl)
    formData.append("description", description)
    const response  = await axios.post(Api_Url, formData, {
        headers : {"Content-Type":  "multipart/form-data" }
    })
    
    return response.data
}



