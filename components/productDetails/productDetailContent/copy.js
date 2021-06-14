import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import { StarIcon } from "@heroicons/react/outline"
import { capitalizeFirstLetter, getDiscountPrice, getProductCartQuantity } from "@/common/utils"
import { addToCart } from "../../../redux/actions/cartActions"
import QuantityController from "@/components/controls/QuantityController"

function ProductDetailContent({ product, cartItems }) {
  const {
    name,
    price,
    shortDescription,
    discount,
    category,
    tag,
    variation,
    stock,
    minOrder,
    limits,
  } = product

  // console.log(limits)

  const [selectedProductColor, setSelectedProductColor] = useState(
    variation ? variation[0].color : ""
  )
  const [selectedProductSize, setSelectedProductSize] = useState(
    variation ? variation[0].size[0].name : ""
  )
  const [productStock, setProductStock] = useState(variation ? variation[0].size[0].stock : stock)
  const [quantityCount, setQuantityCount] = useState(1)
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  )

  const discountedPrice = getDiscountPrice(price, discount)

  const finalProductPrice = +price.toFixed(2)

  const finalDiscountPrice = +discountedPrice.toFixed(2)

  const addedToCart = (quantity) => {
    toast.success("Added To Cart")
    console.log(quantity)
  }
  // const [value, setValue] = useState(1)

  //   console.log(max)
  // console.log(onChange(value))

  // useEffect(() => {
  //   onChange && onChange(value)
  // }, [value])

  // useEffect(() => {
  //   setValue(defaultValue)
  // }, [defaultValue])
  const decreaseValue = useCallback(() => {
    if (min && quantityCount <= min) {
      return
    } else {
      if (quantityCount <= 1) {
        return
      }
      onDecrease && onDecrease()
      setValue(quantityCount - 1)
    }
  }, [quantityCount])

  const increaseValue = useCallback(() => {
    if (quantityCount >= (quantityCount < productStock - productCartQty)) {
      return
    }
    onIncrease && onIncrease()
    setValue(quantityCount + 1)
  }, [quantityCount])

  return (
    <div className="col-span-1 ml-5">
      <div className="space-y-4">
        {/* Product Variation */}
        {variation ? (
          <div className="product-details-variation space-y-3">
            <div className="flex items-center product-details-color">
              <span>Color:</span>
              <div className="ml-3 flex">
                {variation.map((single, key) => {
                  return (
                    <label
                      className="relative inline-block h-5 w-5 leading-5 mr-4 cursor-pointer transition-all duration-300 ease-linear rounded-3xl"
                      key={key}
                      style={{
                        border: `1px solid ${single.color}`,
                        backgroundColor: `${single.color}`,
                      }}
                    >
                      <input
                        type="radio"
                        value={single.color}
                        name="product-color"
                        className="absolute h-full cursor-pointer opacity-0"
                        checked={single.color === selectedProductColor ? "checked" : ""}
                        onChange={() => {
                          setSelectedProductColor(single.color)
                          setSelectedProductSize(single.size[0].name)
                          setProductStock(single.size[0].stock)
                          setQuantityCount(1)
                        }}
                      />
                      <span className="relative inline-block w-6 h-6 m-0 text-sm font-medium checkmark"></span>
                    </label>
                  )
                })}
              </div>
            </div>
            <div className="flex product-details-size">
              <span>Size:</span>
              <div className="ml-5 pro-details-size-content">
                {variation &&
                  variation.map((single) => {
                    return single.color === selectedProductColor
                      ? single.size.map((singleSize, key) => {
                          // console.log(singleSize.stock.concat())
                          // const totalStock = single.size.reduce((acc,curr)=>{
                          //   return stock.stock
                          // })
                          // console.log(
                          //   // single.size.reduce((acc, current) => {
                          //   //   return acc + current
                          //   // })
                          //   // singleSize.stock.reduce((acc, current) => {
                          //   //   return acc + current
                          //   // })
                          //   singleSize.concat()
                          // )
                          return (
                            <div className="flex items-center mb-2" key={key}>
                              {/* <p className="w-10 text-sm font-medium uppercase">
                                {singleSize.name}
                              </p>
                              <input
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                                type="radio"
                                value={singleSize.name}
                                checked={singleSize.name === selectedProductSize ? "checked" : ""}
                                onChange={() => {
                                  setSelectedProductSize(singleSize.name)
                                  setProductStock(singleSize.stock)
                                  setQuantityCount(1)
                                }}
                              />
                              <span className="font-xs font-normal w-full mb-0 p-2 block size-name">
                                {singleSize.name}
                              </span> */}
                              <div className="cart-plus-minus">
                                <button onClick={decreaseValue} className="dec qtybutton">
                                  -
                                </button>
                                <input
                                  className="cart-plus-minus-box"
                                  type="text"
                                  value={quantityCount}
                                  readOnly
                                />
                                <button
                                  onClick={() =>
                                    setQuantityCount(
                                      quantityCount < productStock - productCartQty
                                        ? quantityCount + 1
                                        : quantityCount
                                    )
                                  }
                                  className="inc qtybutton"
                                >
                                  +
                                </button>
                              </div>
                              {/* <p className="w-10 text-sm font-medium uppercase">
                                {singleSize.name}
                              </p>
                              <p className="w-full ml-5 text-sm font-medium uppercase flex">
                                Rs. {singleSize.price}
                              </p> */}

                              {/* <QuantityController
                                max={singleSize.stock}
                                defaultValue={1}
                                onChange={setQuantityCount}
                              /> */}
                            </div>
                          )
                        })
                      : ""
                  })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Add To Cart */}
        <div className="flex">
          {!variation && (
            // <div className="cart-plus-minus">
            //   <button
            //     onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
            //     className="dec qtybutton"
            //   >
            //     -
            //   </button>
            //   <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
            //   <button
            //     onClick={() =>
            //       setQuantityCount(
            //         quantityCount < productStock - productCartQty
            //           ? quantityCount + 1
            //           : quantityCount
            //       )
            //     }
            //     className="inc qtybutton"
            //   >
            //     +
            //   </button>
            // </div>
            <QuantityController
              max={stock}
              defaultValue={1}
              onChange={(val) => setQuantityCount(val)}
            />
          )}
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                className="btn-bhotahiti focus:outline-none"
                // onClick={() =>
                //   addToCart(
                //     product,
                //     toast,
                //     quantityCount,
                //     selectedProductColor,
                //     selectedProductSize
                //   )
                // }
                onClick={() => addedToCart(quantityCount)}
                disabled={productCartQty >= productStock || quantityCount <= minOrder}
              >
                Add To Cart
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, toast, quantityCount, selectedProductColor, selectedProductSize) => {
      dispatch(addToCart(item, toast, quantityCount, selectedProductColor, selectedProductSize))
    },
  }
}

export default connect(null, mapDispatchToProps)(ProductDetailContent)
