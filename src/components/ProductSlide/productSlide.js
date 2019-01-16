import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"

import './productSlide.css'

const ProductSlide = ({ renderImg }) => {

    const mapImg = renderImg.map(img => {
        return <img key={Math.floor(Math.random() * 100) + 1} src={img.img} alt='pc' />
    })
    return ( 
        <Carousel showArrows={true} showThumbs={false} verticalSwipe='natural' className='products' swipeable={false}>
            {mapImg}
        </Carousel>
    )
}
export default ProductSlide                 