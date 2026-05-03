const x = 10 // Integer
const y = 12.23 // Float
const name = "Remi" // String
const isExpired = false // Boolean

const user1 = {
    name: "Remi",
    age: 30,
    sex: "male",
    isRegistered: true,
    password: "remi123"
} // Object

const user2 = {
    name: "Budi",
    age: 28,
    sex: "male",
    isRegistered: true,
    password: "budi123"
}

const user3 = {
    name: "Ellie",
    age: 31,
    sex: "female",
    isRegistered: true,
    password: "ellie123"
}

const user4 = {
    name: "Timi",
    age: 22,
    sex: "male",
    isRegistered: true,
    password: "timi123"
}

const user5 = {
    name: "Amel",
    age: 25,
    sex: "female",
    isRegistered: true,
    password: "amel123"
}

const users = [user1, user2, user3, user4, user5] // Array 

for(let i = 0; i < users.length; i++){
    // console.log(`Hello, my name is ${users[i].name}, I'm ${users[i].age} years old`)
} // Looping


// DRY / Don't repeat yourself
// Function
const handleLogin = ()=>{
    // 1. Kita coba ambil input username
    const inputUsername = document.querySelector(".input-username")
    // 2. Kita coba liat di database users kita, ada gak username nya?
    let isUserFound = false
    let foundUser = {} // Object
    for(let i = 0; i < users.length; i++){
        if(inputUsername.value == users[i].name){
            isUserFound = true
            foundUser = users[i]
        }
    }
    if(isUserFound){
        // 4. Kalo sampe ada, coba cek, password nya bener apa ngga?
        const inputPassword = document.querySelector(".input-password")
        if(inputPassword.value == foundUser.password){
            // 6. kalo bener, berarti berhasil login.
            window.location.href = "/tweets"
            localStorage.setItem("user", foundUser.name)
        }
        else{
            // 5. kalo ngga kasih tau password incorrect
            const errorNotification = document.querySelector(".error-notification")
            errorNotification.textContent = "Password incorrect"
        }
    }
    else{
        // 3. Kalo gak ada berarti kasih tau, users not found
        const errorNotification = document.querySelector(".error-notification")
        errorNotification.textContent = "User not found"
    }
}

const loginButton = document.querySelector(".login-button")
loginButton.onclick = ()=>{
    handleLogin()
}

// Event listener for Enter keydown
document.onkeydown = (e)=>{
    if(e.code == "Enter"){
        handleLogin()
    }
}