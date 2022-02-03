import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cartActions from './store/actions/cart';

import './component-styles.css';

const Card = ({ product, children }) => {
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch();

    return (
        <div className='container mt-5'>
            <div className='container wrapper-card'>
                <img width="140px" src={product.image} alt={product.name_product} className='card-prod-image' />
                <h5 className='card-prod-name'>
                    {children}
                </h5>
                <div className='divider'></div>
                <p className='card-prod-price'>
                    R$ {product.price.toFixed(2)}
                </p>
                <div className='divider'></div>

                <button
                    onClick={() => dispatch(cartActions.Add(cart, product))}
                    className='botao-adicionar'>
                    Adicionar
                </button>
            </div>
        </div>
    )
}

export default Card;
