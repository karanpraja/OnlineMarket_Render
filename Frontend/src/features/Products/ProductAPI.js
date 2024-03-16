import {  serverjsx } from "../..";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/products`)
    const data=await response.json()
    resolve({data})//how to keep data in resolve    
}
  );
}

export function fetchProductsbyFilter({filter,sort,pagination}) {///\
  //filter=['category':{'smartphones','laptops'}]
//
  let queryString=''
  
  for(let key in filter)
  {
    const category=filter[key]
    if(category.length){
    const lastCategoryValue=category[category.length-1]

    console.log(lastCategoryValue+"lkjkl")
    queryString+=`${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort)
  {
  queryString+=`${key}=${sort[key]}&`
  }
  for(let key in pagination)
  {
    queryString+=`${key}=${pagination[key]}&`
  }


  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/products?`+queryString)
    const data=await response.json()
    const totalItems= await response.headers.get('X-Total-Count')
    console.log({totalItems:totalItems})
    resolve({data:{products:data,totalItems:+totalItems}})//how to keep data in resolve
        
  }
    // setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/categories`)
    const data=await response.json()
    resolve({data})//how to keep data in resolve    
}
  );
}
export function fetchBrands() {
  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/brands`)
    const data=await response.json()
    resolve({data})//how to keep data in resolve    
}  );
}
export function fetchProductbyId(id) {
  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/products/${id}`)

    const data=await response.json()
    resolve({data})//how to keep data in resolve    
}
  );
}

export function updateProductById(Data){
  return new Promise(async(resolve,react)=>{
const response=await fetch(`${serverjsx}/products/${Data.id}`,{
  method:'PATCH',
  body:JSON.stringify(Data.product),
  headers:{
    'Content-Type':'application/json'
  }
})
const data=await response.json()
resolve({data})

  })
}
// export function fetchProductsbySort(option) {
//   let queryString=''
  
//     queryString+=`_sort=${option._sort}&_order=${option._order}&`
//     console.log
  
//   // console.log(queryString)
//   return new Promise(async(resolve) =>{
//     const response=await fetch('http://localhost:8080/products?'+queryString)
//     const data=await response.json()
//     resolve({data})//how to keep data in resolve
        
//   }
//   );
// }
