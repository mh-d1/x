

// Populate navigations
const navigations = [
    {
        icon:"fa-solid fa-house",
        label:"Home",
        onclick:()=>{}
    },
    {
        icon:"fa-solid fa-gear",
        label:"Settings",
        onclick:()=>{}
    },
    {
        icon:"fa-solid fa-envelope",
        label:"Messages",
        onclick:()=>{}
    },
    {
        icon:"fa-solid fa-bookmark",
        label:"Bookmarks",
        onclick:()=>{
            console.log('bookmark')
        }
    },
    {
        icon:"fa-solid fa-arrow-left",
        label:"Logout",
        onclick:()=>{
            localStorage.removeItem("user")
            window.location.href = "/"
        }
    },
]

const createNavigation = (nav)=>{
    // 1. Ambil elemen navigation
    const navigation = document.querySelector(".navigation")
    // 2. Kita clone
    const newNavigation = navigation.cloneNode(true)
    // 3. kita isi icon dan juga label nya
    const iconNavigation = newNavigation.querySelector("i")
    iconNavigation.className = nav.icon

    const labelNavigation = newNavigation.querySelector(".navigation-label")
    labelNavigation.textContent = nav.label
    // 4. adain onclick function
    newNavigation.onclick = nav.onclick

    // 5. kita append ke navigation container
    const navigationContainer = document.querySelector(".navigation-container")
    navigationContainer.appendChild(newNavigation)
}

for(let i=0; i < navigations.length ; i++){
    createNavigation(navigations[i])
}

// Tweets

// 1. buat event listener di button-post onclick
const buttonPost = document.querySelector(".button-post")
// user, timestamp, content

const textareaInput = document.querySelector(".textarea-input")

const createTweet = (t)=>{
    // 3. ambil tweet element
    const tweet = document.querySelector(".tweet")
    // 4. clone twee element
    const newTweet = tweet.cloneNode(true)
    // 5. modifkasi name, datetime, dan juga content
    const name = newTweet.querySelector(".tweet-name")
    name.textContent = t.user

    const datetime = newTweet.querySelector(".tweet-datetime")
    datetime.textContent = new Date(t.timestamp).toLocaleString()

    const content = newTweet.querySelector(".tweet-content")
    content.textContent = t.content
    // 6. ambil tweet container element
    const tweetsContainer = document.querySelector(".tweets-container")
    // 7. Modifikasi style position dan juga z-index
    newTweet.style.position = "relative"
    newTweet.style.zIndex = "0"

    // make tweet trash function
    const tweetTrash = newTweet.querySelector(".tweet-trash")
    tweetTrash.onclick = ()=>{
        console.log('trash')
        newTweet.remove()
        
        const tweetsString = localStorage.getItem("tweets")
        const tweets = JSON.parse(tweetsString)

        const newTweets = []
        for(let i = 0; i < tweets.length; i++){
            if(t.timestamp != tweets[i].timestamp){
                newTweets.push(tweets[i])
            }
        }
        localStorage.setItem("tweets", JSON.stringify(newTweets))
    }

    // 8. append new tweet element yang di buat ke contaienr
    tweetsContainer.appendChild(newTweet)

    // 9. reset textarea
    textareaInput.value = ""
}

const storeTweet = (t)=>{
    // 1. kita ambil tweets dari local storage
    const tweetsString = localStorage.getItem("tweets")

    // 2. check ada atau tidak tweets yang sudah di store
    if(tweetsString){
        // 3. Kalau udah pernah store tweets di localstorage
        const tweets = JSON.parse(tweetsString)

        const newTweets = []
        
        for(let i=0; i < tweets.length; i++){
            newTweets.push(tweets[i])
        }
        newTweets.push(t)
        localStorage.setItem("tweets",JSON.stringify(newTweets))
    }
    else{
        // 4. Kalau belum pernah
        localStorage.setItem("tweets",JSON.stringify([t]))

    }
}

buttonPost.onclick = ()=>{
    const newTweet = {
        user:localStorage.getItem("user"),
        timestamp:Date.now(),
        content:textareaInput.value
    }
    createTweet(newTweet)
    storeTweet(newTweet)

    // Animation
    buttonPost.style.opacity = `100%`
    setTimeout(()=>{
        buttonPost.style.opacity = `75%`
    },200)
}

// Populate tweets
const tweetsString = localStorage.getItem("tweets")
const tweets = JSON.parse(tweetsString)

for(let i = 0; i < tweets.length ; i++){
    createTweet(tweets[i])
}

// Post Button animation
buttonPost.onmouseenter = ()=>{
    buttonPost.style.opacity = `75%`
}
buttonPost.onmouseleave = ()=>{
    buttonPost.style.opacity = `50%`
}