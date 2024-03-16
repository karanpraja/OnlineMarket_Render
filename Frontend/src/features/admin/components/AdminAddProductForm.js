import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductbyIdAsync, selectBrands, selectCategories, selectProduct, updateProductByIdAsync } from "../../Products/ProductSlice"
import { createProductAsync } from "../AdminSlice"
import { useParams } from "react-router-dom"
import { useEffect} from "react"
// import { updateProductById } from "../../Products/ProductAPI"

const AdminAddProductForm=()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
      } = useForm()
      const dispatch=useDispatch()
      const params=useParams()
      const id=params.id
     
      useEffect(()=>{
        console.log("lajsf")
        
      id&&dispatch(fetchProductbyIdAsync(id))
      !id&&reset()
      },[id,dispatch,reset])
      const product=useSelector(selectProduct)
      // const [selectedProduct,setSelectedProduct]=useState(null)
      
      useEffect(()=>{
        if(product&&selectProduct){
          setValue('name',product.name)
          setValue('imagealt',product.imagealt)
          setValue('price',product.price)
          setValue('discountPercentage',product.discountPercentage)
          setValue('stock',product.stock)
          setValue('brand',product.brand)
          setValue('category',product.category)
          setValue('imageSrc',product.imageSrc)
          setValue('image1',product.images[0])
          setValue('image2',product.images[1])
          setValue('image3',product.images[2])
          setValue('image4',product.images[3])
        }
      },[setValue,product])




      let brands=useSelector(selectBrands)
brands=[...brands.map(b=>b.value)]
let category=useSelector(selectCategories)

category=[...category.map(category=>category.value)]
const updateProducts=(data)=>{
    console.log(data)
    let parsedData={name:data.name,imagealt:data.imagealt,price:+data.price,discountPercentage:+data.discountPercentage,stock:+data.stock,imageSrc:data.imageSrc,rating:+data.rating,href:"productdetail",brand:data.brand,category:data.category}
    let images=[data.image1,data.image2,data.image3,data.image4]
    parsedData={...parsedData,images}
       id&&dispatch(updateProductByIdAsync({product:parsedData,id:id}))
       console.log(parsedData)
      !id&&dispatch(createProductAsync(parsedData))
  // reset()
 }
 const deleteHandler = (e) => {
  console.log(e.target.value)
  dispatch(updateProductByIdAsync([{delete:true},id]))
  reset()
// console.log(e.target.value)
   }

return(<div>
        {/* {
      "id": 3,
      "name": "Samsung Universe 9",
      "href": "productdetail",
      "imagealt": "Samsung's new variant which goes beyond Galaxy to the Universe",
      "price": 1249,
      "discountPercentage": 15.46,
      "rating": 4.09,
      "stock": 36,
      "brand": "Samsung",
      "category": "smartphones",
      "imageSrc": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/3/1.jpg"
      ],
      "user": 9,
      "quantity": 1
    } */}
       <form className="mb-10 bg-white mt-12 py-4 px-4" noValidate  onSubmit={handleSubmit((data)=>{
        // console.log(data.value)
        updateProducts(data)
       })}>
      <div className="space-y-12 my-10 ">
    <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 -gray-900 ">Product Detail</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name',{required:'Please enter full name'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name&&<p className="text-red-500">{errors.name.message}</p>}
              </div>
            </div>

            <div className="col-span-full">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Product Description/imageAlt
              </label>
              <div className="mt-2">
                <textarea
                  id="imagealt"
                  name="imagealt"
                  rows={3}
                  {...register('imagealt',{required:'Please enter discription'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
             Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  {...register('price',{required:'Please enter price' ,})}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.price&&<p className="text-red-500">{errors.price.message}</p>}

              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
             Discount Percentage%
              </label>
              <div className="mt-2">
                <input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  

                  {...register('discountPercentage',{required:'Please enter discountPercentage',min:1 , max:100})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.discountPercentage&&<p className="text-red-500">{errors.discountPercentage.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
             Stock
              </label>
              <div className="mt-2">
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  {...register('stock',{required:'Please enter stock' ,min:1})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.stock&&<p className="text-red-500">{errors.stock.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
             rating
              </label>
              <div className="mt-2">
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  {...register('rating',{required:'Please enter valid rating' ,min:0,max:5})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.rating&&<p className="text-red-500">{errors.rating.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  name="brand"
                  {...register('brand',{required:'Please select brand'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    {brands.map(brand=>(
                        <option>{brand}</option>
                    ))}
                  {/* <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option> */}
                </select>
                {errors.brand&&<p className="text-red-500">{errors.brand.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-3">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  {...register('category',{required:'Please select category'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    {category.map(category=>(
                        <option>{category}</option>
                    ))}
                  {/* <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option> */}
                </select>
                {errors.category&&<p className="text-red-500">{errors.category.message}</p>}

              </div>
            </div>

            <div className="col-span-full">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                imageSrc/Link
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="imageSrc"
                  id="imageSrc"
                  {...register('imageSrc',{required:'Please enter imageSrc'})}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.imageSrc&&<p className="text-red-500">{errors.imageSrc.message}</p>}

              </div>
            </div>

            <div className="sm:col-span-full sm:col-start-1">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Image1/Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="image1"
                  id="image1"
                  
                  min={1}
                  {...register('image1',{required:'Please enter image1'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image1&&<p className="text-red-500">{errors.image1.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-full sm:col-start-1">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Image2/Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="image2"
                  id="image2"
                  
                  min={1}
                  {...register('image2',{required:'Please enter image2'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image2&&<p className="text-red-500">{errors.image2.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-full sm:col-start-1">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Image3/Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="image3"
                  id="image3"
                  
                  min={1}
                  {...register('image3',{required:'Please enter image3'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image3&&<p className="text-red-500">{errors.image3.message}</p>}

              </div>
            </div>
            <div className="sm:col-span-full sm:col-start-1">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Image4/Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="image4"
                  id="image4"
                  
                  min={1}
                  {...register('image4',{required:'Please enter image4'})}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image4&&<p className="text-red-500">{errors.image4.message}</p>}

              </div>
            </div>

            

            
            
          </div>


          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
        type='submit'
        value='delete' 
onClick={e=>deleteHandler(e)}
        className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Delete Product
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </button>
      </div>

        </div>
</div>
</form>
                </div>)
}
export default AdminAddProductForm