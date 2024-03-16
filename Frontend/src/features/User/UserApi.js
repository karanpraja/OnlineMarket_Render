import { serverjsx } from "../.."

export function fetchLoggedInUserData(){

  return new Promise(async(resolve,reject)=>{
const response=await fetch(`${serverjsx}/user/own`)
const data=await response.json()
resolve({data})
    })
}
export function removeUserInfo(){

    return new Promise(async(resolve,reject)=>{
//   const response=await fetch(`/user/rm`)
//   const data=await response.json()
  let data1="Successfull"
  resolve(data1)
      })
  }

export function fetchUpdateLoggedInUserData(user){
    const userId=user.id
    return new Promise(async(resolve,reject)=>{
const response=await fetch(`${serverjsx}/user/`+userId,{
    method:'PATCH',
    body:JSON.stringify(user),
    headers:{
        "Content-Type":"application/json"
    }
    
})

const data=await response.json();
console.log(data)
resolve({data})

    })
}
























