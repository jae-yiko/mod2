import React, {Component} from 'react'

class Recipe extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            //this is to put what user typed in the "search recipe" input
            search : "",
            // this is to get all of the results from that search
            results: [],
            //this is to grad that clicked indexs id so that we can fetch that indexes recipes ingredients
            idNum: 0,//this.state.results[''].id
            // this is where all of the ingredients are put into once the id is grabbed 
            ingredients:[],
            // saving:[],
        }
        //this fetch is for the search to grab recipes that have the users searched ingredients
        this.handleSearching = this.handleSearching.bind(this)
        // this is to put what the user is searching for into this.state.search
        this.handleChange = this.handleChange.bind(this)
        // this fetch is for getting the ingredients of a specific recipe through that recipes id
        this.handleIngr = this.handleIngr.bind(this)
        // grabs that clicked object's id and puts it in this.state.idNum
        this.grabID = this.grabID.bind(this)
    }

    // search: search recipes/
    handleSearching(event){
        event.preventDefault()
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query="+ this.state.search, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bd27ff3bbfmshc4dc8718dddaf67p1d8e7djsnd1f2c95e440d",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then((dataset) => dataset.json())
        .then(response => {
            console.log(response)
            // the first results: is refering to this.state.results, "response." is the data from the api, and the results at the end of response.results is refering to the datas array name which is also called results
            this.setState({results: response.results})
            // console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }
    // data: recipes ingredients by id/ingredientWidget

    handleIngr (event)
    {
        event.preventDefault()
        //below is not needed because you can automatically just put the event.target.id into the fetch link. we did this because we had to click the "see ingredient" button twice in order for it to grab the id and place it in the fetch link 
        // this.setState({idNum: event.target.id})
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${event.target.id}/ingredientWidget.json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bd27ff3bbfmshc4dc8718dddaf67p1d8e7djsnd1f2c95e440d",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then((dataset) => dataset.json())
        .then(response => {
            this.setState({ingredients: response.ingredients})
            console.log( response);
        })
        .catch(err => {
            console.error(err);
        });
        // console.log(this.state.idNum)
    }

    handleChange(event){
        //in this case event.target is whatever user types in the input field
        //this is one way to write handle change
        // const {name,value} = event.target
        // this.setState({[name]:value})
        // console.log(this.state.search)

        // this is another way to write handle change
        this.setState({search:event.target.value})
        console.log(this.state.search)
    }

    grabID(event){
        this.setState({idNum: event.currentTarget.id})
    }

    render(){
        console.log(this.state.results)
        console.log(this.state.ingredients)
        // console.log(this.state.saving)
        return(
            <div className="recipeContent">
                <form onSubmit={this.handleSearching}>
                    <label>
                        <input text="text" placeholder="Search Recipes" onChange={this.handleChange} value={this.state.search} name ='search'/>
                    </label>
                    <button className="search!">Search</button>
                </form>
                <div className="everything">
                    <p>
                    {this.state.results.map((val)=>{
                        return(
                            <li key = {val.id} id= {val.id} onClick={this.grabID}>
                                <div className="moveit">
                                    {/* title is what it is called in the api */}
                                    {val.title} <br/>
                                    {/* {val.title} <br/> */}
    {/* https://spoonacular.com/recipeImages/Cookies-and-Cream-Cheesecakes-489213.jpg */}
    {/* below I had to put the  "https://spoonacular.com/recipeImages/" with val.image because without the first part the image would not show up and the line above is what we are doing in the line below*/}
                                    <img src={"https://spoonacular.com/recipeImages/"+val.image} width="100px"/> <br/> 
                                    Ready in: {val.readyInMinutes} minutes <br/> 
                                    Servings: {val.servings} <br/>
                                    <button className="showRecipe" key={val.id} id={val.id} onClick={this.handleIngr} value={this.state.idNum} name="idNum">
                                        See Ingredients
                                    </button> 
                                    <a target="_blank" href={val.sourceUrl}>
                                        <button>
                                            Get Recipe
                                        </button>
                                    </a>
                                    <div className="ingre">
                                        {this.state.ingredients.map((value)=>{
                                            console.log(value)
                                            return(
                                                <div >
                                                    {value.name }  
                                                    {value.amount.us.value}
                                                    {value.amount.us.unit}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </li>
                        )})
                    }
                    </p>
                </div>
            </div>
        )
    }
}
export default Recipe