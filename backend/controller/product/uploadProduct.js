const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{

        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.json({
            message : "Product Uploaded Successfully",
            data : saveProduct,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController