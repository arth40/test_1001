import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Fetchdata extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      malecheck: true,
      femalecheck: true,
      unisexcheck: true,
      products_all: null,
      search:"",
    };
    this.handleValuemale = this.handleValuemale.bind(this);
    this.handleValuefemale = this.handleValuefemale.bind(this);
    this.handleValueunisex = this.handleValueunisex.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  componentDidMount(){
    fetch("https://demo7242716.mockable.io/products")
    .then(res=>{
      res.json().then((items)=>{
        //console.log(items.products)
        this.setState({
          products_all: items.products,
        })
        //console.log(this.state.products_all);
      })
    })
    //console.log(this.state.products_all);
  }
  handleValuemale(){
    this.setState({
      malecheck: !this.state.malecheck,
    }) 
  }
  handleValuefemale(){
    this.setState({
      femalecheck: !this.state.femalecheck,
    }) 
  }
  handleValueunisex(){
    this.setState({
      unisexcheck: !this.state.unisexcheck,
    }) 
  }
  handleSearch(event){
    this.setState({
      search: event.target.value,
    })
    //console.log(this.state.search);
  }

  render() {
    return (
      <div class="main">
      <div class="sidebar">
        <form>
          <ul><h4>Gender</h4></ul>
          <ul>
            <input type="checkbox" id="male" name="male" value="Male" checked={this.state.malecheck} onChange={this.handleValuemale}></input>
            <label for="male">Men</label> 
          </ul>
          <ul>
            <input type="checkbox" id="female" name="female" value="Female" checked={this.state.femalecheck} onChange={this.handleValuefemale}></input>
            <label for="female">Women</label>
          </ul>
          <ul>
            <input type="checkbox" id="unisex" name="unisex" value="Unisex" checked={this.state.unisexcheck} onChange={this.handleValueunisex}></input>
            <label for="unisex">Unisex</label>
          </ul>
          {/* <ul><input type="submit" value="Apply Filters"></input></ul> */}
        </form>
      </div>
      <div class="basepage">
      <div class="searcharea">
      <input type="text" class="searchbox" value={this.state.search} onChange={this.handleSearch} />
      </div>
        { 
          this.state.products_all?
          this.state.products_all.map((product)=>
          {
            if(product.productName.toLowerCase().match(this.state.search))
            {
              if(this.state.malecheck && product.gender=="Men")
              {
                return(
                <div class="productcards">
                <img class="product_img" src={product.images[0].src} />
                <h5 class="brand_title">{product.brand}</h5>
                <h5 class="product_title">{(product.productName).replace(product.brand,'').replace(product.gender,'')}</h5>
                <h5 class="price_title">Rs. {product.price} <span class="mrp_title">{product.mrp}</span></h5>
                </div>
                )
              }
              if(this.state.femalecheck && product.gender=="Women")
              {
                return(
                <div class="productcards">
                <img class="product_img" src={product.images[0].src} />
                <h5 class="brand_title">{product.brand}</h5>
                <h5 class="product_title">{(product.productName).replace(product.brand,'').replace(product.gender,'')}</h5>
                <h5 class="price_title">Rs. {product.price} <span class="mrp_title">{product.mrp}</span></h5>
                </div>
                )
              }
              if(this.state.unisexcheck && product.gender=="Unisex")
              {
                return(
                <div class="productcards">
                <img class="product_img" src={product.images[0].src} />
                <h5 class="brand_title">{product.brand}</h5>
                <h5 class="product_title">{(product.productName).replace(product.brand,'').replace(product.gender,'')}</h5>
                <h5 class="price_title">Rs. {product.price} <span class="mrp_title">{product.mrp}</span></h5>
                </div>
                )
              }
            }
          }
        ) 
        :null
        }
      </div>
      </div>
    );
  }
}

function App() {
  return (
    <Fetchdata />
  );
}

export default App;
