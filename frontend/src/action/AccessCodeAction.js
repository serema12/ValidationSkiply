import ServerDomain from "../serverdomain";
import axios from "axios";

const getValidationCode = async (phoneNumber) => {
    
    
    const inputData = JSON.stringify({
      phoneNumber: phoneNumber
    })

    console.log(inputData)
    const accessCode = await axios.post(`${ServerDomain}/get`,inputData,{
                        headers: { 
                          "Content-Type":"application/json",
                        },
                      })
                      .then((resData)=>{
                        
                        console.log(`Get Success with ${resData.data['accessCode']}`)
                        return resData.data['accessCode']
                      })
                      .catch((err)=>{
                        const error= "Something went wrong. Check your input again"   
                        throw new Error(error)
                      });
    
    return accessCode;
}
const validateAccessCode = async (phoneNumber,accessCode) => {
    
    
    const inputData = JSON.stringify({
      phoneNumber: phoneNumber,
      accessCode:accessCode,
    })

    await axios.post(`http://localhost:5000/validate`,inputData,{
                    headers: { 
                      "Content-Type":"application/json",
                    },
          })
          .then(resData=>{
                    console.log("Validation Success")
                    alert('Validation Success')
          })
          .catch(err=>{
                    const error= "Something went wrong. Check your input again"
                    
                    
                    
          });    
}

export {getValidationCode,validateAccessCode}