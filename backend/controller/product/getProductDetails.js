const productModel = require("../../models/productModel")

const getProductDetail = async(req,res) => {
    try{
        const { productId } = req?.body

        const product = await productModel.findById(productId)

        res.json({
            message : "Category of Product",
            data : product,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetail