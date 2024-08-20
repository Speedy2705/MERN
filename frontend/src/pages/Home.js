import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Famous Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Brand New Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Brand New Mouses"}/>
      <VerticalCardProduct category={"television"} heading={"Brand New Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

    </div>
  )
}

export default Home