import React, {useState} from 'react'
import replace from '../../../../img/Placeholder.png'


const ProductCom = (props) => {
    const [smallForm, setSmallForm] = useState({
        productId: props.id,
        color: '',
        quantity: 1,
        size: '',
        price: props.originalPrice
      })
    const handleChange = (e) => {
        setSmallForm({...smallForm, [e.target.name]: e.target.value});
      }
      const handleSmallSubmit = (id) => {
          let Arr = [];
          Arr.push({
            productId: id,
            color: smallForm.color,
            quantity: smallForm.quantity,
            size: smallForm.size,
            price: smallForm.quantity*props.originalPrice
          });
          props.setDataForm({
            user: props.dataFrom.user,
            paymentMethod: props.dataFrom.paymentMethod,
            products: props.dataFrom.products?.concat(Arr),
            totalPrice: props.dataFrom.totalPrice + Arr[0].price,
          })
          document.getElementById(`btn-${id}`).disabled = true;
    }
    return (
            <div className='product_in_check' key={props.key} style={{width: '100%', display: 'flex', alignItems: 'flex-start'}}>
                <img className='product_img_check' src={props.photo || replace} alt='product_img' style={{height:'323px', width:'100%', objectFit: 'cover'}}/>
              <div id='signup'>
                <div class="form-group">
                  <label className='form_label' for="quantity">Quantity:</label>
                  <input type="number" min={1} max={props.quantity} name='quantity' value={smallForm.quantity} class="form-control" id="quantity" onChange={handleChange} placeholder="Enter The Quantity" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="color">Color:</label>
                  <select id="for" name="color" className="form-control" value={smallForm.for} onChange={handleChange}>
                  <option value="none">Please Choose..</option>
                  {props.colors.map(innerItem=> 
                    <option value={innerItem}>{innerItem.toUpperCase()}</option>
                    )}
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="size">Size:</label>
                  <select id="for" name="size" className="form-control" value={smallForm.for} onChange={handleChange}>
                  <option value="none">Please Choose..</option>
                  {props.size.map(innerItem=> 
                    <option value={innerItem}>{innerItem.toUpperCase()}</option>
                    )}
                   </select>
                </div>
                <button type="button" id={`btn-${props.id}`} onClick={()=>handleSmallSubmit(props.id)} class="btn btn-dark btn-block">Done</button>
          </div>
          </div>
    )
}

export default ProductCom
