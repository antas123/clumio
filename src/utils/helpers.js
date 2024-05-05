const apiKey = '2825dbc4dcbd72362ad60c9776170461';
const hash = '4b946b6bbe325c01b691657bde93f195';
const baseURL1 = 'https://gateway.marvel.com:443/v1/public/';
const baseURL2 = 'https://gateway.marvel.com/v1/public/'


//fetching comics ========================================================
  export const fetchComics = async(searchTerm,selectedHeroes,page)=>{
    let url = ''
    if(searchTerm !=='' ){
        url = `${baseURL1}comics?titleStartsWith=${searchTerm}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${page-1}&limit=${20}`
    }
    else if(selectedHeroes.length){
        const characterIds = selectedHeroes?.map(character => character).join('%2');
      url = `${baseURL1}characters/${characterIds}/comics?ts=1&apikey=${apiKey}&hash=${hash}&offset=${page-1}&limit=${20}`
    }
    else {
        url =`${baseURL2}comics?ts=1&apikey=${apiKey}&hash=${hash}&offset=${page-1}&limit=${20}`
    }
    const response = await fetch( url)
    const jsonData = await response.json();
    return jsonData
  }

// data fetching for heroers on carousel===================================
export const fetchCarouselHeroes = async()=>{
    const response = await fetch(`${baseURL2}characters?ts=1&apikey=${apiKey}&hash=${hash}`)
    const jsonData = await response.json();
    return jsonData
}  

