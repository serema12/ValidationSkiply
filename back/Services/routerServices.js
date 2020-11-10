
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAcountKey.json");

/*----------------DB connection starts----------------*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sckiply.firebaseio.com/"
})

/*----------------DB connection ends----------------*/
var db = admin.database();
var ref = db.ref();
//,reg.body.accessCode
const ValidatingAccessCode = async (req,res)=>{
    
    
    await ref.on('value',
            item =>{
                const listOfUsers = item.val()
                const filteredUsers = Object.keys(listOfUsers)
                                            .find( key =>{ 
                                                    return listOfUsers[key].phoneNumber == req.body.phoneNumber && 
                                                            listOfUsers[key].accessCode==req.body.accessCode
                                            })
                console.log(listOfUsers)
                if (!filteredUsers) return res.status(404).json({message:"Phone or Access Code Do Not Found"})
                
                //success
                return res.status(201).json({message: "Validation Success"});
            
        })
    
}

const GetAccessCode = async (req,res)=>{
    
    await ref.once('value', 
            item =>{
                
                const listOfUsers = item.val()
                //
                const findByPhone = Object.keys(listOfUsers).find(key =>{ return listOfUsers[key].phoneNumber== req.body.phoneNumber })
                
                
                if (findByPhone) return res.status(404).json({message:"Phone has already had Or Do Not Found"})

                //Random keys
                const accessCode = String( Math.floor(Math.random()*Math.floor(1000)));
                console.log(accessCode)
                ref.push({phoneNumber:req.body.phoneNumber,accessCode:`${accessCode}`})
                return res.status(201).json({message: "Get Access Code Success",accessCode:accessCode});

                

            
        })
    
}
module.exports = {ValidatingAccessCode,GetAccessCode}