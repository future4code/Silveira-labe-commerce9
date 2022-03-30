import React from 'react';
import styled from 'styled-components';
import {CardsHome} from './CardsHome'

const HomeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-bottom: -80px;
    background-color: black;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 10px;
`
const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    grid-auto-rows: minmax(200px, 50%);
    padding: 100px 20px;
`
const InputContainer = styled.div`    
    margin-right: 20px;
    
`
const ProductQuantity = styled.p`   
    margin-left: 20px;
    color: white;
`
const SelectContainer = styled.select`
  background-color: aqua;
  color: black;
  padding: 6px 10px;
  border: 1px solid black;
  border-radius: 10px;
`
const OptionContainer = styled.option`
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
`
const LabelWhite = styled.label`
    color: white;
`

export class Home extends React.Component {
    state = {
        sort: "decrescente"

    };

    getFilteredAndOrderedList = () => {
        return this.props.products
            .filter((product) =>  this.props.maxFilter? product.cost < this.props.maxFilter : true)
            .filter((product) => this.props.minFilter ? product.cost > this.props.minFilter : true)
            .filter((product) => this.props.nameFilter ? product.title.includes(this.props.nameFilter) : true)
            .sort((a, b) => this.state.sort === "crescente" ? a.cost - b.cost : b.cost - a.cost)
    }

    onChangeSort = (event) => {
        this.setState({sort: event.target.value});
    }
    
    render(){
        const filteredAndOrderedList = this.getFilteredAndOrderedList()
        return( 
            <div>
                <HomeContainer>
                    <ProductQuantity>Quantidade de produtos: {filteredAndOrderedList.length}</ProductQuantity>
                    <InputContainer>    
                        <LabelWhite>
                            Ordenação:  
                            <SelectContainer value={this.state.sort} onChange={this.onChangeSort}>
                                <OptionContainer value="crescente">Crescente</OptionContainer>
                                <OptionContainer value="decrescente">Decrescente</OptionContainer>
                            </SelectContainer>
                        </LabelWhite>
                    </InputContainer>
                </HomeContainer>

                <Container>
                    {filteredAndOrderedList.map((product)=> {
                        return <CardsHome
                        product={product}
                        onAddProductToCart={this.props.onAddProductToCart}
                       />
                    })}
                </Container>
            </div>
        );
    }
}