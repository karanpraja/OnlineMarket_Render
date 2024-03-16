import { serverjsx } from "../.."

export  function createProduct(product){
    console.log(product)
return new Promise(async(resolve,reject)=>{
    const response=await fetch(`${serverjsx}/products`,{
        method:'POST',
        body:JSON.stringify(product),
        headers:{
            'Content-Type':'application/json'
        }

    })
    const data=await response.json()
    resolve({data})
})
}