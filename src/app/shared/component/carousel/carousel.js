import React from 'react';
import './carousel.module.scss';

export default function Carousel() {
    return (
        <div className="carousel-wrapper" style={{ height: '40%', width: '100%', marginBottom: '60px' }}>
            <span id="target-item-1"></span>
            <span id="target-item-2"></span>
            <span id="target-item-3"></span>

            <div className="carousel-item item-1" style={{ backgroundImage: "url('https://image.freepik.com/free-vector/black-friday-gift-sale-minimal-background_1017-15996.jpg')", height: '450px', marginBottom: '20px' }}>
            </div>
        </div>
    )
}
