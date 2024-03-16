import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//category filters
//pagination
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import {  fetchBrandsAsync, fetchCategoriesAsync, fetchProductsbyFilterAsync,  selectBrands, selectCategories, selectProducts, selecttotalItems, } from "../../Products/ProductSlice";
// import { ITEMS_PER_PAGE } from "../../../const";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../const";

const sortOptions = [
  { name: "Best Rating",_sort: "rating", _order: "desc", current: false },
  { name: "Price: Low to High",_sort:'price', _order: "asc", current: false },
  { name: "Price: High to Low",_sort:'price', _order: "desc", current: false },
];


//////testing git
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
  }
//

function AdminProductList() {
  const dispatch = useDispatch();
const products=useSelector(selectProducts)
const categories=useSelector(selectCategories)
const brands=useSelector(selectBrands)
const totalItems=useSelector(selecttotalItems)
const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE)
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
const [filter,setFilter]=useState({})/////
const [sort,setSort]=useState({})/////
const [page,setPage]=useState(1)

const filters = [
  {
    id: "category",
    name: "Category",
    options: categories
  },
  {
    id: "brand",
    name: "Brand",
    options: brands
  },
  

];

const handleFilter=(e,section,option)=>{
  console.log(section.id,option.value)
  let newfilter={...filter}/////
  console.log('1')

  if(e.target.checked)
  {
         if(newfilter[section.id]){
  console.log('2')
        //  newfilter[section.id].push(option.value)
        console.log(option.value)
        newfilter[section.id].push(option.value)
  console.log('3')

         }else{
  console.log('4')

         //in this way array=>{}=>{{id:value}}
         newfilter[section.id]=[option.value]
         }
  }else{
        const index=newfilter[section.id].findIndex((el)=>(el===option.value))
        newfilter[section.id].splice(index,1)
        //please use your brain properly 
        //newfilter={c:{},d:{} but newfilter[section.id] is different
      }
  
  console.log(newfilter)
  setFilter(newfilter)/////
  // dispatch(fetchProductsbyFilterAsync(newfilter))/////
}
const sortHandler=(e,option)=>{
  console.log(option._sort,option._order)
  const newSort={_sort:option._sort,_order:option._order}/////
  setSort(newSort)
  // dispatch(fetchProductsbyFilterAsync(newSort))/////
} 
const pageHandler=(e,page)=>{
  console.log(page)
  setPage(page)
}


useEffect(()=>{
  // dispatch(fetchAllProductsAsync(filter))
  const pagination={_page:page,_limit:ITEMS_PER_PAGE}
  dispatch(fetchProductsbyFilterAsync({filter,sort,pagination}))/////
dispatch(fetchCategoriesAsync())
dispatch(fetchBrandsAsync())

},[dispatch,filter,sort,page])

  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilters products={products} handleFilter={handleFilter} sortHandler={sortHandler} filters={filters} totalPages={totalPages}
            setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen}/>
{/*DESKTOP FILTERS */}
            <DesktopFilters products={products} handleFilter={handleFilter} sortHandler={sortHandler} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} filters={filters}  totalPages={totalPages}/>
          </div>
        </div>
        {/* pagination */}
        <Pagination pageHandler={pageHandler} ITEMS_PER_PAGE={ITEMS_PER_PAGE} page={page} totalItems={totalItems} totalPages={totalPages}/>
      </div>
    </div>
  );
}

const MobileFilters=({handleFilter,filters,sortHandler,products,mobileFiltersOpen,setMobileFiltersOpen})=>{

return(
  <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        <h3 className="sr-only">Categories</h3>

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            onChange={e=>handleFilter(e,section,option)}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
{/*DESKTOP FILTERS */}
            
          </div>
)
}

const DesktopFilters=({setMobileFiltersOpen,products,handleFilter,filters,sortHandler})=>{
  return(
    <div>
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  onClick={e=>sortHandler(e,option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      onChange={e=>(handleFilter(e,section,option))}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* Your content */}

                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                      <div className="flex">
                        <Link to={'/admin/adminaddproduct'}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </Link >
         </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ">
                          {products.map((product) => (
                            <div>
                            <div key={product.id} className="group relative rounded-md p-4 h-full border-solid border-2 border-gray-300 ">
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <Link to={`/productdetail/${product.id}`} key={product.id}>

                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </Link>

                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {product.name}
                                  </h3>
                                  {/* <p className="mt-1 text-sm text-gray-500">
                                    {product.}
                                  </p> */}
                                   <p className="text-sm font-medium text-gray-900 ">
                                  <StarIcon className="w-5 h-5 inline"/> 
                                  <span className="align-bottom">
                                    {product.rating}
                                    </span>
                                  </p>
                                </div>
                                <div>
                              <p className="text-sm line-through font-medium text-gray-900">
                                  ${product.price}
                                  </p>
                                <p className="text-sm font-medium text-gray-900">
                                  ${discountedPrice(product)}
                                </p>
                               </div>
                              </div>
                              {product.delete&&<p className="text-red-400">Product deleted</p>}
                              {product.stock<=0&&<p className="text-red-400">Product out of Stock</p>}
                            </div>
                          <div  className="flex">
                            <Link to={`/admin/adminaddproduct/edit/${product.id}`}
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                           Edit Product
                               </Link>
                              </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
            </div>
  )
}
const Pagination=({pageHandler,ITEMS_PER_PAGE,page,totalItems,totalPages})=>{
return(
  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div
                  onClick={e=>pageHandler(e,(page>1?page-1:page))}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </div>
            <div
                  onClick={e=>pageHandler(e,(page<totalPages?page+1:page))}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to{" "}
                <span className="font-medium">{page*ITEMS_PER_PAGE>totalItems?totalItems:page*ITEMS_PER_PAGE}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div
                  onClick={e=>pageHandler(e,(page>1?page-1:page))}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
               
                 { Array.from( {length:totalPages}).map((el, index) => (
                    <div
                    onClick={e=>pageHandler(e,index+1)}
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${page===(index+1)?'bg-indigo-600 text-white':''} cursor-pointer px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index+1}
                    </div>
                  )) }
                <div
                  onClick={(e=>pageHandler(e,page<totalPages?page+1:page))}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
)
}

export default AdminProductList;

