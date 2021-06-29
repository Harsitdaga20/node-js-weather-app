console.log('client side javascript is fetched')

// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error) {console.log(data.error)}
//         else {console.log(data.location)
//          console.log(data.forecast)
//         }
//     })
// })

const weatherform=document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading....'
    messagetwo.textContent=''
    const location=search.value;
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {messageOne.textContent=data.error;}
        else {messageOne.textContent=data.location;
            messagetwo.textContent=data.forecast;
        }
    })
})

})