const apikey='a91629a2aafd48e4aab4f9ff056f1142';

const blogContainer=document.getElementById('blog-conatiner');
const search=document.getElementById("Search")
const search_btn=document.getElementById("searchButton")

async function fetchRandomNews()
{
    try{

        const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=12&apiKey=${apikey}`
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles
    }
    
    catch(error)
    {
       console.error("Error fetching random news",error);
       return [];
    }
}

search_btn.addEventListener('click', async () =>{
     
    const searchQuery = search.value.trim();
    if(searchQuery !== "")
    {
        try
        {
              const articles=await fetchNewsQuery(searchQuery)
              displayBlogs(articles)
        }
        catch(error)
    {
        console.error("Error fetching news",error);
    }
    }
})

async function fetchNewsQuery(searchQuery)
{
    try{

        const apiUrl=`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=12&apiKey=${apikey}`
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles
    }
    
    catch(error)
    {
       console.error("Error fetching random news",error);
       return [];
    }

}

function displayBlogs(articles)
{
  
    blogContainer.innerHTML="";
    articles.forEach((article)=>{
        const blogCard=document.createElement("div")
        blogCard.classList.add("blog-card")
        blogCard.setAttribute("class", "mx-auto flex flex-col border border-gray-300 hover:cursor-pointer hover:-translate-y-3 transition mt-4 p-4 gap-3 hover:bg-slate-400 transition")
        const img = document.createElement("img")
        img.setAttribute("class", "w-55 h-50")
        img.src=article.urlToImage
        img.alt=article.title
    
        const title=document.createElement("h2")
        title.setAttribute("class","text-2xl font-semibold")
        const shorttitle=article.title.length > 30 ? article.title.slice(0,30) : article.title

        title.textContent=shorttitle
        const description=document.createElement("p")
        description.setAttribute("class","font-medium")
        const shortdesc=article.description.length > 30 ? article.description.slice(0,30) : article.title

        title.textContent=shortdesc;
        description.textContent=article.description
        console.log(description)

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, '_blank')
        })
        blogContainer.appendChild(blogCard)

        
    })
    
    
}


(async ()=>{
    try{
          const articles= await fetchRandomNews();
          displayBlogs(articles)
    }
    catch(error)
    {
        console.error("Error fetching random news",error);

    }
})();
