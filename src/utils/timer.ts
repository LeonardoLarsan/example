const timer = (time: number)=> new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(null)
    }, time)
})

export default timer