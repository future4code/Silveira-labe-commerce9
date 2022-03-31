import React from 'react';
import './App.css';
import styled from 'styled-components';
import {Home} from './components/Home/Home';
import Filter from './components/Filter';
import Carrinho from './components/carrinho'
import imagem1 from './imagem/1.png';
import imagem2 from './imagem/2.png';
import imagem3 from './imagem/3.png';
import imagem4 from './imagem/4.png';
import imagem5 from './imagem/5.png';
import imagem6 from './imagem/6.png';
import imagem7 from './imagem/7.png';
import imagem8 from './imagem/8.png';




const AppContainer = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 3fr 1fr; */
  padding: 15px;
  margin: 0;
  flex-direction:column;
  justify-content: center;
`
const products = [
  {
    id: 1,
    title: 'Viagem a Saturno',
    cost: 23,
    image: imagem1,
  },
  {
    id: 2,
    title: 'Viagem a Plutão',
    cost: 20,
    image: imagem2
  },
  {
    id: 3,
    title: 'Viagem a Vênus',
    cost: 50,
    image: imagem3
  },
  {
    id: 4,
    title: 'Viagem a Terra',
    cost: 10,
    image: imagem4
  },
  {
    id: 5,
    title: 'Viagem a Netuno',
    cost: 30,
    image: imagem5
  },
  {
    id: 6,
    title: 'Viagem a Júpter',
    cost: 35,
    image: imagem6
  },
  {
    id: 7,
    title: 'Viagem a Marte',
    cost: 45,
    image: imagem7
  },
  {
    id: 8,
    title: 'Viagem a Urano',
    cost: 50,
    image: imagem8
  }
]

export default class App extends React.Component {
  state = {
    quantity:0,
    minFilter: '',
    maxFilter: '',
    nameFilter: '',
    productsInCart: []
  }


  onChangeMinFilter = (event) => {
    this.setState({minFilter: event.target.value})
  }

  onChangeMaxFilter = (event) => {
    this.setState({maxFilter: event.target.value})
  }

  onChangeTitleFilter = (event) => {
    this.setState({nameFilter: event.target.value})
  }

  onAddProductToCart = (productId) => {
    const productInCart = this.state.productsInCart.find(product => productId === product.id)

    if(productInCart){
      const newProductsInCart = this.state.productsInCart.map(product => {
        if(productId === product.id) {
          return{
            ...product,
            quantity: product.quantity + 1
          }
        }
        return product
      })
      this.setState({productsInCart: newProductsInCart})
    } else {
      const productToAdd = products.find(product => productId === product.id)
      const newProductsInCart = [...this.state.productsInCart, {...productToAdd, quantity: 1}]

      this.setState({productsInCart: newProductsInCart})
    }
  }

  onRemoveProductFromCart = (productId) => {
    const newProductsInCart = this.state.productsInCart.map((product) => {
      if(product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1
        }
      }
      return product
    }).filter((product) => product.quantity > 0)

    this.setState({productsInCart: newProductsInCart})
  }

  render() {
    return (
     
      <AppContainer>
     <header>
       <h1>Space Trip</h1>
     </header>
     
        
        <Filter 
        maxFilter = {this.state.maxFilter}
        minFilter = {this.state.minFilter}
        nameFilter = {this.state.nameFilter}
        onChangeMaxFilter = {this.onChangeMaxFilter}
        onChangeMinFilter = {this.onChangeMinFilter}
        onChangeTitleFilter = {this.onChangeTitleFilter}      
        />
        
        <Home    
          products={products}
          minFilter={this.state.minFilter}
          maxFilter={this.state.maxFilter}
          nameFilter={this.state.nameFilter}
          onAddProductToCart={this.onAddProductToCart}/>
        <Carrinho 
          products={this.state.productsInCart}
          onRemoveProductFromCart ={this.onRemoveProductFromCart}
        /> 
        
      </AppContainer>
      
    
    );
  }
}