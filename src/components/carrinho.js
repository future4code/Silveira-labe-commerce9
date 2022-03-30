import React from 'react';
import styled from 'styled-components';

const Cart = styled.div `
    border: 1px solid black;
    display: flex;
    align-content: space-between;
    padding-top: 2vh;
    align-items: center;
    justify-content: flex-start;
    height:100vh;
    flex-direction: column;
    border-radius: 10px;
    color: black;
`
const TituloCarrinho = styled.h3 `
    text-align:center;
    color: black;
    margin-top: 28px;
`
const Product = styled.div `
    display: flex;
    margin-top: 5vh;
    align-content: space-between;
    color: black;
`
const Quantity = styled.p `
    padding-right: 10px;
    color: black;
`
const ProductName = styled.p `
    padding-right: 10px;
    color: black;
`
const Remove = styled.button `
    height:30px;
    width:30px;
    border-color:black;
    margin-top:2.25vh;
    border-radius:4px;
    background-color: white;
    padding-bottom:10px;
    font-size: 1.5em;
    text-align:center;
    font-weight:bolder;
    color:red;
    align-items:center;
    justify-content:center;
`
const TotalValue = styled.div `
    margin-top: 5vh;
    color: black;
    font-weight:bolder;
`

export default class Carrinho extends React.Component {
    getTotalValue = () => {
        let totalValue = 0
        for(let product of this.props.products) {
          totalValue += product.cost * product.quantity    
        }
        return totalValue
    }
    render() {
        return (
            <Cart>
                <TituloCarrinho>Carrinho</TituloCarrinho>
                {
                // Colocar a props para e o map para chamar um item por item e receber a props do app.js
                    this.props.products.map(item => (
                        <Product>
                            <Quantity>{item.quantity}</Quantity>
                            <ProductName>{item.title}</ProductName>
                            <Remove onClick={()=>this.props.onRemoveProductFromCart(item.id)}> - </Remove>
                        </Product>
                ))
                }
                <TotalValue>Valor total: R${this.getTotalValue()}</TotalValue>
            </Cart>
        );
    }
}