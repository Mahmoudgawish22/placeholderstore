import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'



function SearchModal(props) {
  const products = useSelector((state)=> state.products).filter(item=> item.quantity>0);

  const [searchProducts, setSearchProducts] = useState([])

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setSearchProducts(products.filter(item=> item.name.includes(e.target.value)));
  }
  const openPost = (id) => {
      props.onHide();
      history.push(`/product/${id}`)
  }

    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
          <Modal.Header closeButton>
          </Modal.Header>
        <Modal.Body>
          <div id='editing_company' style={{gap: '5px'}}>
            <div class="form-group" style={{width: '100%'}}>
                {products.length==0?
                <input type="text" name='name' class="form-control" onChange={handleChange} id="name" placeholder="Wait For Fetching Products.." disabled/>
                :
                <input type="text" name='name' class="form-control" onChange={handleChange} id="name" placeholder="Enter Product Name"/>
            }
            </div>
            <div style={{width: '100%', minHeight: '200px', display:'flex', flexDirection: 'column'}}>
                {searchProducts?.slice(0,5).map(item=> 
                    <button id='searchInput' key={item._id} style={{display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap'}} className="btn btn-block btn-light" onClick={()=>openPost(item._id)}>
                      <img src={item.photo} alt='searched-product' style={{width: '50px', height: '50px', objectFit:'cover'}}/>
                      <span style={{fontWeight: 'bold'}}>{item.name?.slice(0,8)}..</span> From: <span style={{color: 'darkblue'}}>{item.company}</span>
                    </button>
                    )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
    );
  }
  export default SearchModal;