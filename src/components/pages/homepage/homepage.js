import './homepage.css';
import Offers from '../homepage/offers/offers'
import BigOffers from '../homepage/bigOffers/bigoffers'
import TrendySections from '../homepage/trendySections/trendysections'
import NewProducts from '../homepage/newProducts/newproducts'
import BestSell from '../homepage/bestSell/bestsell'
import All from '../homepage/allProducts/allproducts'
import BestCom from '../homepage/bestCompanies/bestCom'
import OurServ from '../homepage/ourServices/ourserv'


function Homepage() {
  return (
    <div className="homepage">
      <BigOffers/>
      <TrendySections/>
      <NewProducts/>
      <Offers/>
      <BestSell/>
      <All/>
      <BestCom/>
      <OurServ/>
    </div>
  );
}

export default Homepage;