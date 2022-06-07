import axios from 'axios';
import api from "./apiInstance"
const url = "https://localhost:7218/api/"
axios.defaults.withCredentials=true;

export async function register(data){
    let fullUrl = url+"Authentication/register";
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

export async function getFlashcardsGroup(){
   
    return new Promise((resolve,reject)=>
     api.get("FlashcardsGroups")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function addFlashcard(data){
    return new Promise((resolve,reject)=>
     api.post("FlashcardsGroups/create-flashcards",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function getFlashcard(data){
    return new Promise((resolve,reject)=>
     api.get("FlashcardsGroups/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function getQuizGroup(){
   
    return new Promise((resolve,reject)=>
     api.get("Quiz")
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function addQuiz(data){
    return new Promise((resolve,reject)=>
     api.post("Quiz/create-quiz-group",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function getQuiz(data){
    return new Promise((resolve,reject)=>
     api.get("Quiz/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function sendResults(data){
    return new Promise((resolve,reject)=>
     api.post("Quiz/validate-answers/",data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}
export async function deleteFlashcards(data){
    return new Promise((resolve,reject)=>
     api.delete("FlashcardsGroups/"+data)
        .then(res => {
            
           console.log(res)
           resolve(res)
        })
        .catch(err => {
            console.log(err);
            reject(err)
        }))
}

export async function deleteQuiz(data){
    return new Promise((resolve,reject)=>
     api.delete("Quiz/"+data)
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

export async function deleteTraining(data){
    return new Promise((resolve,reject)=>
     api.delete("Training/"+data)
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

export async function BuyPremium(data){
    return new Promise((resolve,reject)=>
     api.post("Authentication/premium-account/",Number(data))
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