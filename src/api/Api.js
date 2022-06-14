import axios from 'axios';
import api from "./apiInstance"
const url = "https://localhost:7218/api/"
axios.defaults.withCredentials=true;

export async function register(data){
    let fullUrl = url+"Authentication/register";
    console.log(data)
    return new Promise((resolve,reject)=>
     axios.post(fullUrl,data,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
            console.log(res)
            resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function registerAdmin(data){
    let fullUrl = url+"Authentication/register-admin";
    return new Promise((resolve,reject)=>
     axios.post(fullUrl,data,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
            console.log(res)
            resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function login(data){
    let fullUrl = url+"Authentication/login"
    return new Promise((resolve,reject)=>
     axios.post(fullUrl,data,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
            localStorage.setItem("role", JSON.stringify(res.data.roles));
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function CarList(){
    let fullUrl = url+"Car/car-list"
    return new Promise((resolve,reject)=>
     axios.get(fullUrl,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function AvailableCarList(){
    
    return new Promise((resolve,reject)=>
     api.get("Teacher/available-cars")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function GetUserReservations(){
    
    return new Promise((resolve,reject)=>
     api.get("User/get-reservation")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function CarFilter(data){
    
    return new Promise((resolve,reject)=>
     axios.post(url+"Car/filter",data,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}


export async function BuyTokensAPI(data){
    
    return new Promise((resolve,reject)=>
     api.post("User/add-tokens/"+data)
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function CheckTokens(){
    
    return new Promise((resolve,reject)=>
     api.get("User/get-tokens")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function TeacherCarList(){
    
    return new Promise((resolve,reject)=>
     api.get("Teacher/teacher-cars")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function getReservationsRequest(){
    
    return new Promise((resolve,reject)=>
     api.get("Teacher/get-reservations-request")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function getSchedule(){
    
    return new Promise((resolve,reject)=>
     api.get("Teacher/get-schedule")
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}


export async function getBrands(){
    let fullUrl = url+"Car/get-car-brands"
    return new Promise((resolve,reject)=>
     axios.get(fullUrl,{
        headers: {
          'Content-Type': 'application/json',                        
        },})
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function accpectReservation(data){
   
    return new Promise((resolve,reject)=>
     api.post("Teacher/accept/"+data)
        .then(res => {
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function addCar(data){
    console.log(data)
    return new Promise((resolve,reject)=>
     axios.post("https://localhost:7218/api/Car/create-car",data,{
        headers: {
          'Content-Type': 'multipart/form-data',                        
        }})
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function createTrainingReservation(data){

    return new Promise((resolve,reject)=>
     api.post("Training/create-reservation",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}


export async function makeReservation(data){
    console.log(data)
    return new Promise((resolve,reject)=>
     api.post("Loan/create-reservation",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function TeacherAddCar(data){
    return new Promise((resolve,reject)=>
     api.post("Teacher/assign/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function TeacherRemoveCar(data){
    return new Promise((resolve,reject)=>
     api.post("Teacher/remove/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}



export async function getCalendar(data){
    return new Promise((resolve,reject)=>
     api.get("Loan/get-calendar/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function getCalendarTraining(data){
    return new Promise((resolve,reject)=>
     api.get("Training/get-calendar/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}




export async function getTrainings(){
    return new Promise((resolve,reject)=>
     api.get("Training")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function addTraining(data){
    return new Promise((resolve,reject)=>
     api.post("Training/create-training",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}


export async function getEvents(data){
    return new Promise((resolve,reject)=>
     api.get("Training/get-training-details/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function getRegistration(data){
    return new Promise((resolve,reject)=>
     api.get("Training/get-training-registration/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function signUp(data){
    return new Promise((resolve,reject)=>
     api.post("Training/sign-up/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function signO(data){
    return new Promise((resolve,reject)=>
     api.post("Training/sign-out/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}



export async function getProfil(){
    return new Promise((resolve,reject)=>
     api.get("User")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function changePassword(data){
    return new Promise((resolve,reject)=>
     api.post("User/change-password",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function getList(){
    return new Promise((resolve,reject)=>
     api.get("User/users-list")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function delUser(data){
    return new Promise((resolve,reject)=>
     api.post("User/delete-user/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function Tokens(){
    return new Promise((resolve,reject)=>
     api.get("User/get-tokens/")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('role'));;
    
  }
export function getLocalAccessToken(){
    return JSON.parse(localStorage.getItem('token'));;
}

export function getLocalRefreshToken(){
    let refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
    return refreshToken
}
export function updateLocalAccessToken(token){
    localStorage.setItem("token", JSON.stringify(token));
}

export async function logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
}