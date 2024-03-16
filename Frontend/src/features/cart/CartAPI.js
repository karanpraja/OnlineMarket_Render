  import { serverjsx } from "../..";


// A mock function to mimic making an async request for data
export function addToCart(product) {
  console.log(serverjsx)
  return new Promise(async(resolve,reject) =>{
    const response=await fetch(`${serverjsx}/cart`,{
      method:"POST",
      body:JSON.stringify(product),
      headers:{
        'Content-Type': 'application/json'}
    })
    const data=await response.json()
    console.log(data)
    resolve({data})//how to keep data in resolve
  });}


  export function fetchCartItemsByUserId() {
    return new Promise(async(resolve) =>{
      const response=await fetch(`${serverjsx}/cart/id`)
      const data=await response.json()
      resolve({data})//how to keep data in resolve
    });}
  // export function updateCartItem(user) {
  //   return new Promise(async(resolve) =>{
  //     const response=await fetch(`http://localhost:8080/cart?user=${user}`,{
  //       method:"PATCH",
  //       body:JSON.stringify(user),
  //       headers:{
  //         "Content-Type":"application/json"
  //       }
  //     })
  //     const data=await response.json()
  //     resolve({data})//how to keep data in resolve
  //   });}

export function updateCart(item) {
  console.log(serverjsx)
  console.log("updateCart")
  const id=item._id
delete item['_id']
console.log(item)
  return new Promise(async(resolve) =>{
    const response=await fetch(`${serverjsx}/cart/${id}`,{
      method:"PATCH",
      body:JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data=await response.json()
    resolve({data})//how to keep data in resolve
  });
}

  

  export function updateCartUser(user) {
    console.log(user)
    return new Promise(async(resolve) =>{
      const response=await fetch(`${serverjsx}/user/${user.id}`,{
        method:"PATCH",
        body:JSON.stringify(user),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const data=await response.json()
      resolve({data})//how to keep data in resolve
    });}
  
export function deleteItemFromCart(id) {
  return new Promise(async(resolve) =>{
    await fetch(`${serverjsx}/cart/item/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    
    // const data=await response.json()
    resolve({data:{id:id}})//how to keep data in resolve
  })}
  export function deleteAddressfromUser(id) {
    return new Promise(async(resolve) =>{
      await fetch(`${serverjsx}/users?${id}`,{
        method:"DELETE",
        headers:{
          'content-type': 'application/json'
        }
      })
      // const data=await response.json()
      resolve({data:{id:id}})//how to keep data in resolve
    });}
  
    export function resetCart(){
      console.log('resetCart')
      return new Promise(async (resolve,reject)=>{
      console.log('resetCart')
          const response=await fetch(`${serverjsx}
          /cart/items/id`,{
              method:'DELETE',
              headers:{
                  'Content-Type':'application/json'
              }
          })
          const noOfItemsRemoved=await response.json()
          console.log({noOfItemsRemoved:noOfItemsRemoved})
  resolve({data:`All ${noOfItemsRemoved} cart items cleared!`})
  reject({data:"Opertion failed"})
          
          
      })
  }
