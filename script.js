import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"


const appSetting = {
    dbUrl : "https://slistapp-28863-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(appSetting) //initializing the FirebaseApp instance
const db = getDatabase(app, appSetting.dbUrl) // using getdatabase function to get Realtime Database SDK that is associated with FirebaseApp
const addInDb = ref(db, "items")  //referencing the db
const cartBtn = document.getElementById("cart-btn")
const inputEl = document.getElementById("input-el")
const shoppingListEl = document.getElementById("shopping-list")

//converting the object into array using DataSnapshot class and fetching the data from db
onValue(addInDb, function(snapshot){

    if (snapshot.exists()){
        let itemsArr = Object.entries(snapshot.val()) //converting the object into array using DataSnapshot class
    
        clearList()
        for(let i=0; i<itemsArr.length; i++){
            let currentItem = itemsArr[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendListItems(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = "No items here yet...."
    }
})

cartBtn.addEventListener("click", function(){
    let value = inputEl.value
    push(addInDb, value)
    clearInputField()
})

function clearInputField(){
    inputEl.value = ""
}

function clearList(){
    shoppingListEl.innerHTML = ""
}

function appendListItems(item){
    let itemId = item[0]
    let itemValue = item[1]
    let newElement = document.createElement("li")
    newElement.textContent = itemValue
    shoppingListEl.append(newElement)

    newElement.addEventListener("dblclick", function(){
        let location = ref(db, `items/${itemId}`)
        remove (location)
    })
}





