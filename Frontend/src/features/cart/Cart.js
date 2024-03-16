import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { deleteItemFromCartAsync, selectCartLoaded, selectItems, updateCartAsync } from './CartSlice';
import { discountedPrice } from '../../const';

function Cart() {
  const dispatch=useDispatch()
  const Items=useSelector(selectItems)
  const isCartLoaded=useSelector(selectCartLoaded)
  // const [totalItems,setTotalItems]=useState(0)
  // const [totalAmount,setTotalAmount]=useState(0)
  console.log(Items)
  const totalItems=Items&&Items.reduce((total,item)=>item.quantity+total,0)//important
  const totalAmount=Items&&Items.reduce((amount,item)=>item.quantity*discountedPrice(item.product)+amount,0)//important
  console.log(totalItems)
  console.log(totalAmount)

  const updateCart=(e,id)=>{
    console.log(Items)
    console.log(id)
    const Index=Items.findIndex((e)=>(e._id===id))
    console.log(Index)
    let item={...Items[Index],quantity:+e.target.value}
    item.product=item.productId  
    console.log(item)
    dispatch(updateCartAsync(item))
   
  }
  const deleteItem=(e,id)=>{
   dispatch( deleteItemFromCartAsync(id))
  }
  // const [open, setOpen] = useState(true)
  if(!Items.length){
// console.log(object)
  }
  console.log({isCartLoaded:isCartLoaded,ItemsLength:Items.length})
  console.log(((Items.length===0)&&(!isCartLoaded)))  
 return(
  <>
  {(Items.length===0)&&(isCartLoaded)&&<Navigate to='/'></Navigate>}
    <div>
    

        {/* <div className="fixed inset-0 overflow-hidden"> */}
          <div className="absolute inset-0 overflow-hidden overflow-y-scroll ">
            {/* <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"> */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

              
                {/* <div className="pointer-events-auto w-screen max-w-full"> */}
                  <div className="flex h-full flex-col overflow-y-scroll  bg-white shpow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6  sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                       
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul  className="-my-6 divide-y divide-gray-200">
                            {Items.length?Items.map((Item) => (
                              <li key={Item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={Item.product.imageSrc}
                                    alt={Item.product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        {Item.product.name}
                                      </h3>
                                      <p className="ml-4">${discountedPrice(Item.product)}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div>
                                    <p className="text-gray-500">Qty </p>
                                    <select value={Item.quantity} onChange={e=>updateCart(e,Item._id)}>
                                      <option value='1'>1</option>
                                      <option value='2'>2</option>
                                      <option value='3'>3</option>
                                      <option value='4'>4</option>

                                    </select>

                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={e=>deleteItem(e,Item._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )):<p className='text-red-400'>Please add items to cart!</p>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalAmount}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>TotalItems</p>
                        <p>{totalItems}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to='/'>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            // onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
            {/* </div> */}
          </div>
    </>

  );
}
export default Cart;









// {
//   "user": "65bb325d4e672302dcba878e",
//   "productId": "65b3e708939c98d0c7a0258d",
//   "product": "65b3e708939c98d0c7a0258d",
//   "quantity": 5
// }