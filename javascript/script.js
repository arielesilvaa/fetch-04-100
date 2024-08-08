const url = "https://jsonplaceholder.typicode.com/posts"

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const postPage = document.querySelector("#post");
const postcontainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

// Get id from URl

const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id");


// get all post

async function getAllposts() {
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    console.log(data);

    loadingElement.classList.add("hide");

    data.map((post) =>  {

        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postsContainer.appendChild(div);
 
    });
}  

// get individual post 

async function getPost(id) {
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ]);

    const dataPost = await responsePost.Json();

    const dataComments = await responseComments.Json();

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

}

if (!postId) {
    getAllposts();
} else {
    getPost(postId);
}
