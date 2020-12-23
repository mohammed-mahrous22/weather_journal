/* Global Variables */
let dateElment = document.getElementById('date');
let tempElment = document.getElementById('temp');
let contentElment = document.getElementById('content')
const APIkey = '&appid=956b6a56d399a6e4cda17acc6e857f75';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let units = '&units=imperial'
let objectdata = {};
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Create a new date instance dynamically with JS

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click',retrive_data);

/* Function called by event listener */
function retrive_data(e){
  const zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value; 
if (!zip) {
  document.getElementById('zip_error').style.display = 'block';
}else if (!feelings) {
  document.getElementById('feelings_error').style.display = 'block';
}
else{
  document.getElementById('zip_error').style.display = 'none';
  document.getElementById('feelings_error').style.display = 'none';
  retrive(apiUrl,units,zip,APIkey)
  .then(function(data){
    postdata('/postdata',{temp:data.temp, date:newDate, input:feelings})
    getdata('/all').then(function(projectData){
      updateUI(projectData);
    })
  })}
}

/* Function to GET Web API Data*/

const retrive = async (url ,units, zipcode , key)=>{
  const res = await fetch(url+zipcode+units+key);
    try{
        const AllData = await res.json();
         let data  = AllData.main;
         return data;   
    }
    catch(error){
        console.log("error" , error);
    }
}

/* Function to POST data */

const postdata = async (url='', data={})=>{

  const res = await fetch(url,{
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  
  try{
    const data = await res.json();

  }catch(error){
    console.log('error',error);
  }
}

/* Function to GET Project Data */

const getdata = async (url = '')=>{
  const res = await fetch(url);
 try {
    const AllData = await res.json();
    objectdata = AllData;
    return objectdata;
  }catch (error){
    console.log('error',error);
  }  
}
//Function to Update The Ui
function updateUI(data = {}){
  contentElment.innerHTML = `you're feeling: ${data.input}`;
  tempElment.innerHTML = `today's tempreature in celsius: ${data.temp}`;
  dateElment.innerHTML = `Date: ${data.date}`;
}
