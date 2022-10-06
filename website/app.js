/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newd=d.toDateString();
let baseurl='http://api.openweathermap.org/data/2.5/forecast?zip=';
const apikey ='&appid=8718e129606fd188e5f36053487ed071&units=imperial';

 document.getElementById('generate').addEventListener('click',performAction);
function  performAction(e){
    const newz=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    getWeather(baseurl,newz,apikey)
    .then(function(data)
    {
        console.log(data);
        postData('/add',{date:newd,temp:data.list[0].main.temp,content:feelings})
        updateUI();
    })
};
const getWeather=async(baseurl,zip,key)=>{
    const res= await fetch(baseurl+zip+key)
    try{
        const data =await res.json();
        return data;
    }catch(error){
        console.log("Error",error);
    }
}
const postData=async(url='',data={})=>{
    console.log(data);
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },body:JSON.stringify(data)
    });
    try {
        const newData=await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("Error",error);
    }
}

const updateUI=async()=>{
    const request =await fetch('/all');
    try{
        const alld =await request.json();
        document.getElementById('date').innerHTML=`Date: ${alld.date}`;
        document.getElementById('temp').innerHTML=`Tempratuar: ${alld.temp}`;
        document.getElementById('content').innerHTML=`I Feel: ${alld.content}`;

    }catch(error){
        console.log("Error",error);
    }
}