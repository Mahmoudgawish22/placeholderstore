import React, {useState, useEffect} from 'react'
import './ODS.css'
import ODSModal from './odsModal/odsModal'
import { useSelector } from 'react-redux'


const ODS = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const offersImgs = useSelector((state) => state.offersImg);
    const slideShowOffersImg = offersImgs?.slice(0,3)
    const othersOffersImgsWide = offersImgs?.slice(3,5)
    const othersOffersImgsTall = offersImgs?.slice(5)
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const handleClick = (item) => {
        setData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (offersImgs.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [offersImgs]) 
if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div style={{width: '100%'}}>
            {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px'}}>
               <div class="spinner-boxh" >
                 <div class="configure-border-1h">  
                 <div class="configure-coreh"></div>
                 </div>  
                 <div class="configure-border-2h">
                 <div class="configure-coreh"></div>
                 </div> 
                        </div>
               </div> 
              :
        <div id='ods'>
            <br/>
            <h5 style={{textAlign: 'center'}}>To Change The Photos Of Offers, Just Replace The Old One According To The Place Of It In The Home Page.</h5>
            <br/>
            {slideShowOffersImg.map(item=> 
                <div key={item._id} style={{width: '100%'}}>
                <img style={{height: '250px', width: '100%', objectFit: 'cover'}} src={item.photo}/>
                <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-type'><i class="fas fa-pencil-alt"></i></button>
                </div>
                )}
                <div id='offers__others' style={{width:'100%'}}>
                <div id='left__offers'>
                {othersOffersImgsWide.map(item=> 
                <div key={item._id} style={{width: '100%'}}>
                <img style={{height: '250px', width: '100%', objectFit: 'cover'}} src={item.photo}/>
                <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-type'><i class="fas fa-pencil-alt"></i></button>
                </div>
                )}
                </div>
                <div id='right__offers'>
                {othersOffersImgsTall.map(item=> 
                <div key={item._id} style={{width: '100%'}}>
                <img style={{height: '543px', width: '100%', objectFit: 'cover'}} src={item.photo}/>
                <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-type'><i class="fas fa-pencil-alt"></i></button>
                </div>
                )}                </div>
            </div>
            

            <ODSModal
            show={show}
            offerImg_data= {Data}
            onHide={() => setShow(false)}
            />
        </div>}
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default ODS
