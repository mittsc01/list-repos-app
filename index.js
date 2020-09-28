function watchForm(){
    $('form').on('submit',(e)=>{
        e.preventDefault();
        $('#js-error-message').addClass('hidden')
        $('#repo-display').addClass('hidden')
        retrieveList(e.target['user-input'].value)
        $('#user-input').val("")
        
    })
}

function displayRepos(data,user){

    //this generates the <li> elements
    const items=generateRepoList(data);
    
    $('#repo-display').removeClass('hidden')

    $('#repo-display').html(
        `<h2 id="user-handle">${user}'s repositiories</h2>
        <ul id='repo-list'>
            ${items}
        </ul>`
    )
    

}

function generateRepoList(data){
    
    let items='';
    for (let i=0;i<data.length;i++){
        items+=`<li>
            <a href='${data[i]['html_url']}'>${data[i]['name']}</a>
            </li>`
            }
            
        return items
    }
    


function retrieveList(user){
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(
        (response)=>{
            if (response.ok){
                
                return response.json()
            }
            throw new Error (response.statusText)
            
        }
        )
    .then(
        data=>displayRepos(data,user)
    )
    .catch(
        error=>{
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
            $('#js-error-message').removeClass('hidden')
    
        }
    )

}



$(watchForm)