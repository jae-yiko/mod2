import React, {Component} from 'react'

class Nutrition extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            nutsearch: '',
            nutresults: [],
            value:'',
        }
        this.handlenutSearch = this.handlenutSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handlenutSearch(event){
        event.preventDefault()
        var url = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + this.state.nutsearch
        console.log(url)
        // fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${this.state.nutsearch}` , {
        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bd27ff3bbfmshc4dc8718dddaf67p1d8e7djsnd1f2c95e440d",
                "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
            }
    })
    .then((dataset) => dataset.json())
    .then(response => {

        this.setState({nutresults: response})
        console.log("results")

        console.log(response);
    })
    .catch(err => {
        console.log("error")
        console.log(err);
    });

    }
    
    handleChange(event){
        this.setState({
            // name: event.target.name,
            nutsearch: event.target.value,
        }) 
        // this.setState({[name]:value})
        // let {name,value} = event.target
        // this.setState({[name]:value})
        console.log(this.state.nutsearch)
    }

    render(){
        console.log(this.state)

        let nutResults = this.state.nutresults
        //nutResults.hints is checking to see if there is a hints property AND to see if there is anything more than 0 length in nutResults[] = nutResults.hints means that it is in the nutresults array
        //if this is not true then nutresults array should be empty
        let ingrArray = nutResults.hints && nutResults.hints.length ? nutResults.hints:[]
        console.log(ingrArray)
        console.log(ingrArray.hints)
        return(
            <div>
                <form onSubmit={this.handlenutSearch}>
                    <label>
                        <input text="text" placeholder="Search Nutrition Facts" onChange={this.handleChange} value={this.state.nutsearch} name ='nutsearch'/>
                    </label>
                    <button className="searchnut">Search</button>
                </form>
                <div>

                {/* {this.state.nutresults?.hints.map((value,index)=>{ */}
                {ingrArray.map((value,index)=>{
                    return(
                        <li key = {index} id= {index}>
                            <div className="nutr">
                                {value.food.label} <br/>
                                Carbohydrate: {value.food.nutrients.CHOCDF} g <br/>
                                Fat: {value.food.nutrients.FAT} g<br/>
                                Fiber: {value.food.nutrients.FIBTG} g<br/>
                                Protein: {value.food.nutrients.PROCNT} g<br/>
                                <img src={value.food.image} width="60px"/>
                            </div>
                        </li>
                    )})
                }
                </div>
            </div> 
        )
    }
}
export default Nutrition
