import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import flickity from 'flickity';
import Flickity from 'react-flickity-component'
import imagesLoaded from 'flickity-imagesloaded';


class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            isToggleOn: false,
            showCocktailID: '',
            selectedValue: '',
            showPopup: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
                
    }
   
    getCocktails(alcohol) {
        axios.get(`http://api.yummly.com/v1/api/recipes`, {
            params: {
                _app_id: 'bd90db8c',
                _app_key: '09d9084e61038c6296815d0591809343',
                q: 'coffee',
                'allowedIngredient[]': alcohol,

                'allowedCourse[]': 'course^course-Beverages',
                
                attributes: {
                    course: "Cocktails"
                },

            }
        }).then((res) => {
            console.log(res.data.matches);
            this.setState({
                cocktails: res.data.matches
            })
        })
    }

    getCocktailRecipe(cocktail) {
        // e.preventDefault();
       
        this.setState(prevState => ({
            showCocktailID: cocktail
            
        }));
     
    }

    handleChange(e) {

        this.setState({
            selectedValue: e.target.value
            }, 

            () => this.getCocktails(this.state.selectedValue)
        );
    }


    togglePopup() {        
        this.setState({        
            showPopup: !this.state.showPopup        
        });        
    }

     render() {

    
    render() {
        return (
            <div>
                <form className="alcoholOption clearfix" value={this.state.selectedValue} onChange={this.handleChange}>
                    <label>
                        <input type="radio" value="rum" checked={this.state.selectedValue === 'rum'}/>
                        <h2>Rum</h2>
                    </label>

                    <label>
                        <input type="radio" value="whiskey" checked={this.state.selectedValue === 'whiskey'}/>
                        <h2>Whiskey</h2>
                    </label>
                    <label>
                        <input type="radio" value="irish" checked={this.state.selectedValue === 'irish'}/>
                        <h2>Irish Cream</h2>
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedValue === 'vodka'}/>
                        <h2>Vodka</h2>
                    </label>

                </form>               
                <ul className="cocktailDisplay">
                    {this.state.cocktails.map(cocktail => 

                </form>    

                {this.state.cocktails.map(cocktail => 

                    <li onClick={()=>this.getCocktailRecipe(cocktail.id)}  key={cocktail.id}>
                        {cocktail.recipeName}
                        <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />
                        {this.state.showCocktailID === cocktail.id ? <CocktailInfo alcohol={this.state.selectedValue} ingredients={cocktail.ingredients}/> : null}
                        
                    </li>

                    
                        <li onClick={()=>this.getCocktailRecipe(cocktail.id)}  key={cocktail.id}>
                            <h2 style={this.state.styles}>{cocktail.recipeName}</h2>
                                <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />

                            {this.state.showCocktailID === cocktail.id ? 
                                <CocktailInfo alcohol={this.state.selectedValue}ingredients={cocktail.ingredients}/> : null}
                            
                            {this.state.showPopup ?
                            <Popup className="popUp"
                                text=''
                                closePopup={this.togglePopup.bind(this)}/> : null}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

class CocktailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients:props.ingredients,
            alcohol:props.alcohol
        }
        // this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
    }
    render(){
        return(
            <div>
                <p>{this.state.ingredients}</p>
                
                {/* this is what we'll use to link to the lcbo api: */}
                <p>{this.state.alcohol}</p>
            </div>
        )
    }
}
class Popup extends React.Component  {        
    render() {        
    return (        
        <div className='popup'>        
            <div className='popup_inner'>        
                {<p>{this.props.text}</p>}        
                <button onClick={this.props.closePopup}>Close</button>        
            </div>        
        </div>        
        );        
    }

            liquors: [],
            ingredients:props.ingredients,
            alcohol:props.alcohol
        }
        
    }
   
   componentDidMount(liquor) {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'http://lcboapi.com/products?',
                params: {
                    _access_key: 'MDo2MWJkNGVlZS1kNDgxLTExZTctODVkNC05ZjYwOTU5N2ExMWU6TTZycmVONzJ4N1RrYWtQdXZCMml2OTFDNUpNa1lhbEpQVnNz',
                    q: `${this.state.alcohol}`,
                    per_page: 5
                },
            }
        }).then((res) => {
            
            this.setState({
                liquors: res.data.result
            })
            console.log(this.state.liquors);
        })
    }
    
    render(){
        const flickityOptions = {
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: 0,
            cellAlign: 'left',
            contain: true
        }
        
        return(
            <div>
                {this.state.ingredients}
                {this.state.liquors.length > 0 ?
                <Flickity
                    className={'carousel'} 
                    elementType={'div'}  
                    options={flickityOptions} 
                    imagesLoaded={true}  
                >
                {this.state.liquors.map(liquor => 
                    <div key={liquor.id} className="liquorBottle">
                        <img src={liquor.image_url} className="bottleImage"/> 
                        <p className="liquorName">{liquor.name}</p>
                    </div>
                )};
                    
                </Flickity>
                : null}
            </div>
        )
    }

}

export default Gallery;