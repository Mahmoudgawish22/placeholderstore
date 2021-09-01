import React, {useState, useEffect} from 'react'
import '../news/news.css'
import email from '../../../../img/dashboard.png'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../mainModals/loadingModal'
import { deleteNews } from '../../../../actions/news'



const News = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const news = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadingModalShow, setLoadingModalShow] = useState(false);
    const handleDelete = (item) => {
        setLoadingModalShow(true);
        dispatch(deleteNews(item._id, setLoadingModalShow, history));
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (news.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [news]) 

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
        <div id='news'>
            {news.map(item=> 
                <div key={item._id} className='news_display'>
                <img src={email} alt='user_profile' className='news_img_display'/>
                <label>{item.email}</label>
                <button onClick={()=> handleDelete(item)} className='btn btn-block btn-danger btn-news'><i class="far fa-trash-alt"></i></button>
            </div>
                )}
              <LoadingModal
                show={loadingModalShow}
                backdrop="static"
              />
        </div>}
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default News
