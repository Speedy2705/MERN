const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.status(200).json({
            data : updateProduct,
            error : false,
            success : true,
            message : "Product Updated Successfully"
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController