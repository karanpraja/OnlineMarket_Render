import { useForm } from "react-hook-form"
import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { fetchLoggedInUserData, fetchLoggedInUserOrders, fetchUpdateLoggedInUserData } from "../UserApi"
import {  fetchUpdateLoggedInUserDataAsync, selectUserInfo } from "../UserSlice"


const UserProfile=()=>{
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()
    const dispatch=useDispatch()
    const userInfo=useSelector(selectUserInfo)
    console.log(userInfo)
    const [selectedAddressIndex,setSelectedAddressIndex]=useState(-1)
    const [showAddress,setShowAddress]=useState(false)
    const removeHandler=(e,index)=>{
const newAddress={...userInfo,addresses:[...userInfo.addresses]}//we have used this cz we can't directly mutate state
newAddress.addresses.splice(index,1)
console.log(newAddress)
dispatch(fetchUpdateLoggedInUserDataAsync(newAddress))
    }
    const handleForm=(e,index)=>{
setSelectedAddressIndex(index)
const address=userInfo.addresses[index]
console.log(address)
setValue('fullname',address.fullname)
setValue('email',address.email)
setValue('country',address.country)
setValue('streetaddress',address.streetaddress)
setValue('city',address.city)
setValue('region',address.region)
setValue('postalcode',address.postalcode)
setValue('phone',address.phone)
    }

    const editForm=(data,index)=>{
      console.log(data)
      console.log(index)
      const newAddress={...userInfo,addresses:[...userInfo.addresses]}//
      newAddress.addresses.splice(index,1,data)
      console.log(newAddress)
      dispatch(fetchUpdateLoggedInUserDataAsync(newAddress)) 
      setSelectedAddressIndex(-1)
    }
    const handleAddAddress=(data)=>{
      const newAddress={...userInfo,addresses:[...userInfo.addresses]}//
      newAddress.addresses.push(data)
      console.log(newAddress)
      dispatch(fetchUpdateLoggedInUserDataAsync(newAddress)) 
      setShowAddress(false)
      reset({
        data
      })
    }
return(<>
             {userInfo&& <div className="flex  flex-col h-full overflow-y-scroll overflow-hidden  bg-white shadow-xl">
                <div className="flex-1 h-full overflow-y-auto  overflow-hidden px-4 py-6  sm:px-6">
                  <div className="flex h-full items-start justify-between">
                    <h1 className="text-lg font-medium text-gray-900">User</h1>
                  </div>
                  <h2>UserEmail:<span className="text-red-500">{userInfo.email}</span></h2>

                  <div className="mt-8">
                    <div className="flow-root my-10">
                   {!showAddress  && <div className="flex">
                    <button
          onClick={e=>{setShowAddress(true)}}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button> 
        </div>}
        <div>
        {showAddress&&   <form className="mb-10 bg-white mt-12 py-4 px-4" noValidate  onSubmit={handleSubmit((data)=>{handleAddAddress(data)
        })} >
      {/* <div className="space-y-12 my-10 "> */}
        
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 -gray-900 ">Add Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> 

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  {...register('fullname',{required:'Please enter full name'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.fullname&&<p className="text-red-500">{errors.fullname.message}</p>}
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register('email',{required:'Please enter email'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email&&<p className="text-red-500">{errors.email.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900">
                place
              </label>
              <div className="mt-2">
                <select
                  id="place"
                  name="place"
                  {...register('place',{required:'Please select place'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                {errors.country&&<p className="text-red-500">{errors.country.message}</p>}

              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  {...register('streetaddress',{required:'Please enter streetaddress'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.streetaddress&&<p className="text-red-500">{errors.streetaddress.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  {...register('city',{required:'Please enter city'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city&&<p className="text-red-500">{errors.city.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  {...register('region',{required:'Please enter region'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.region&&<p className="text-red-500">{errors.region.message}</p>}
                
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postalcode"
                  {...register('postalcode',{required:'Please enter postalcode'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.postalcode&&<p className="text-red-500">{errors.postalcode.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Phone No.
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  {...register('phone',{required:'Please enter phone'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone&&<p className="text-red-500">{errors.phone.message}</p>}

              </div>
            </div>
          </div>


          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
        type="button" 
        onClick={e=>{setShowAddress(false)}}
        className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
// onClick={e=>setShowAddress(false)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>
        </div>
      {/* </div> */}

     
                   </form>}
                   </div>
       
                    <div className="flex justify-between">
  <h2>Saved Addresses</h2>
</div>
                      <ul  className=" divide-gray-200">
                        {(userInfo.addresses.length>0)?(userInfo.addresses.map((address,index) => (  <div>
                        {selectedAddressIndex===index&&  <form className="mb-10 bg-white mt-12 py-4 px-4" noValidate  onSubmit={handleSubmit((data)=>{editForm(data,index)})} >
      <div className="space-y-12 my-10 ">
        
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 -gray-900 ">Edit Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> 

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  {...register('fullname',{required:'Please enter full name'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.fullname&&<p className="text-red-500">{errors.fullname.message}</p>}
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register('email',{required:'Please enter email'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email&&<p className="text-red-500">{errors.email.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  {...register('country',{required:'Please select country'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                {errors.country&&<p className="text-red-500">{errors.country.message}</p>}

              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  {...register('streetaddress',{required:'Please enter streetaddress'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.streetaddress&&<p className="text-red-500">{errors.streetaddress.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  {...register('city',{required:'Please enter city'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city&&<p className="text-red-500">{errors.city.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  {...register('region',{required:'Please enter region'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.region&&<p className="text-red-500">{errors.region.message}</p>}
                
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postalcode"
                  {...register('postalcode',{required:'Please enter postalcode'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.postalcode&&<p className="text-red-500">{errors.postalcode.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Phone No.
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  {...register('phone',{required:'Please enter phone'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone&&<p className="text-red-500">{errors.phone.message}</p>}

              </div>
            </div>
          </div>


          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
        type="button" 
        onClick={e=>{setSelectedAddressIndex(-1)}}
        className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"

          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Address
        </button>
      </div>
        </div> 
      </div>

     
                   </form>}
                          <li key={index} className="flex justify-between gap-x-6 py-5 p-5 border-2 border-gray-200 ">
          <div className="flex min-w-0 gap-x-4 ">
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
            {/* <input  id="name" name="addresses"  type="radio"  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/> */}
            <div className=" flex-auto ">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullname}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.country}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
            <p className="text-sm leading-6 text-gray-900">{address.phone}</p>

            <div className="flex gap-5">
                                      <button
                                      onClick={e=>removeHandler(e,index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                      <button
                                        type="button"
                                        onClick={e=>handleForm(e,index)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Edit
                                      </button>
                                    </div>                    
                               </div>
                         </li>
                         </div>                           
                        ))):(<p>Please add address</p>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>  }
            </>       )

}
export default UserProfile;