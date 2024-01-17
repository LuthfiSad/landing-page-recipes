const URL = 'https://api.spoonacular.com'

export const getRandomOneFood = () => {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(`${URL}/recipes/random?apiKey=ae287325bd374b44a4af74b993226cb7`)
    const dataResponse = await response.json();
    if (!response.ok) {
      reject(dataResponse.message);
      return
    }
    const dataRecipes = dataResponse.recipes[0];  
    resolve(dataRecipes)
  })
}

export const getRandomTenFood = () => {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(`${URL}/recipes/random?apiKey=ae287325bd374b44a4af74b993226cb7&number=10`)
    const dataResponse = await response.json();
    if (!response.ok) {
      reject(dataResponse.message);
      return
    }
    const data = dataResponse.recipes;  
    resolve(data)
  })
}

export const getRecipes = (search, offset) => {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(`${URL}/recipes/complexSearch?apiKey=ae287325bd374b44a4af74b993226cb7&query=${search}&number=20&offset=${offset}&addRecipeInformation=true`)
    const dataResponse = await response.json();
    if (!response.ok) {
      reject(dataResponse.message);
      return
    }
    const data = dataResponse.results;
    if (data.length > 0) {
      resolve(data)
    } else {
      reject("No results")
    }
  })
}

export const getIngredients = (search) => {
  return new Promise(async(resolve, reject) => {
    const response = await fetch(`${URL}/food/ingredients/search?query=${search}&number=10&apiKey=ae287325bd374b44a4af74b993226cb7`)
    const dataResponse = await response.json();
    console.log(dataResponse);
    if (!response.ok) {
      reject(dataResponse.message);
      return
    }
    const data = dataResponse.results;
    if (data.length > 0) {
      resolve(data)
    } else {
      reject("No results")
    }
  })
}