const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res) => {
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId })

        if(isProductAvailable){
            return res.json({
                message : "Already exist in Add to Cart",
                succes : false,
                error : true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser 
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            message : "Product Added to Cart",
            data : saveProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController