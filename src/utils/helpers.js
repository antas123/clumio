// data fetching for comics=================================
export const fetchComics = async(page)=>{
    const response = await fetch(`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=2825dbc4dcbd72362ad60c9776170461&hash=4b946b6bbe325c01b691657bde93f195&offset=${page-1}&limit=${20}`)
    const jsonData = await response.json();
    return jsonData
  }

// data fetching for heroers on carousel===================================
export const fetchCarouselHeroes = async()=>{
    const response = await fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=2825dbc4dcbd72362ad60c9776170461&hash=4b946b6bbe325c01b691657bde93f195')
    const jsonData = await response.json();
    return jsonData
}  

// data fetching for filter based on carousel selected hero==============================
export const fetchComicsByCharacter = async (selectedHeroes,setPageData,pageComicData,page) => {
    if (selectedHeroes.length === 0) {
        // console.log(pageComicData,'poops')
        console.log('carrrr');
      setPageData(pageComicData?.data?.results);
      return;
    }
    try {
      const characterIds = selectedHeroes?.map(character => character).join('%2');
      const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${characterIds}/comics?ts=1&apikey=2825dbc4dcbd72362ad60c9776170461&hash=4b946b6bbe325c01b691657bde93f195&offset=${page-1}`);
      const jsonData = await response.json()
      console.log(jsonData,'carrrr');
      return jsonData
    } catch (error) {
      console.error('Error fetching comics:', error);
      setPageData([]);
    }
  };

// data fetching for search based filter using searchbar======================================
export const fetchComicsUsingSerachbar = async (searchTerm) => {
    try {
      const apiKey = '2825dbc4dcbd72362ad60c9776170461';
      const response = await fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchTerm}&ts=1&apikey=${apiKey}&hash=4b946b6bbe325c01b691657bde93f195`);
      const data = await response.json();
      console.log(data,'urmila')
      return data
    } catch (error) {
      console.error('Error fetching comics:', error);
    }
  };

