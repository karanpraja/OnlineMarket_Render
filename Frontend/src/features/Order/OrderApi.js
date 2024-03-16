import { serverjsx } from "../..";

export function OrderItemsbyUser(order){
    return new Promise(async (resolve,reject)=>{
        const response=await fetch(`${serverjsx}/orders`,{
            method:'POST',
            body:JSON.stringify(order),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        
        resolve({data})
        
    })
}


// A mock function to mimic making an async request for data

export function  fetchAllOrders({sort,pagination}) {///\
  
    let queryString=''
    
    for(let key in sort)
    {
    queryString+=`${key}=${sort[key]}&`
    }
    for(let key in pagination)
    {
      queryString+=`${key}=${pagination[key]}`
    }
  
  
    return new Promise(async(resolve) =>{
      const response=await fetch(`${serverjsx}/orders?`+queryString)
      const data=await response.json()
      const totalOrders= await response.headers.get('X-Total-Count')
      resolve({data:{Orders:data,totalOrders:+totalOrders}})//how to keep data in resolve
          
    }
      // setTimeout(() => resolve({ data: amount }), 500)
    );
  }
  export function fetchLoggedInUserOrders(userId){
    return new Promise(async(resolve)=>{
const response=await fetch(`${serverjsx}/orders/id`)
const data=await response.json()
resolve({data})
    })
}
  

export function UpdateOrders(order){
    return new Promise(async (resolve,reject)=>{
        const response=await fetch(`${serverjsx}/orders/`+order.id,{
            method:'PATCH',
            body:JSON.stringify({status:order.status}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
        resolve({data})
        
    })
}

export function createPaymentIntent(item){
    console.log({createPaymentIntentItem:item})
    return new Promise(async(resolve,reject)=>{
        console.log("api")
        const response=await fetch(`${serverjsx}/create-payment-intent`,{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        // const clientSecret=data.clientSecret
        console.log(data)
        resolve({data})
    })
}