import React, { useState, useEffect } from 'react';
import Colors from '../../components/Colors'
import DetailsThumb from '../../components/DetailsThumb';
import './style.css'
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
import { useParams } from "react-router";
import { BoxLoading } from 'react-loadingg';
let imagesThum = [
  "http://tiasang.com.vn/Portals/0/Images/Dao-tao-KHDL-anh-1.jpg",
  "https://cdn.vietnambiz.vn/2019/10/15/1nvhe7mchqmjbgyvx-uobra-15711056360651103109227.png",
  "https://duhocue.edu.vn/public/uploads/images/hinh-tin-tuc/Nganh-khoa-hoc-may-tinh-nam-2019-top-5-truong-dai-hoc-nen-lua-chon.jpg",
]
const DetailPage = () => {
  let contextProduct = useProduct();
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [imageThunal, setImageThunal] = useState(['https://thietkegame.com/wp-content/uploads/2020/03/loading-8bit.jpg']);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    contextProduct.getDetailProductById(id)
      .then(items => {
        if (mounted) {
          setProducts(items.data);
          imagesThum.unshift(items.data.url_image);
          setImageThunal(imagesThum);
        }
      })
    return () => mounted = false;
  }, [])
  const [index, setIndex] = useState(0)
  let myRef = React.createRef();

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  return (
    <div className="app123">
      {
        products ? (
          <div className="details123" >
            <div className="big-img">
            <img src={imageThunal[index]} alt="" />


            </div>

            <div className="box">
              <div className="row">
                <h2>{products.name}</h2>
                <span style ={{color: '#bb495e'}}>Free</span>
              </div>
              

              <Colors colors={["red", "black", "crimson", "teal"]} />
              <p>{products.short_description}</p>
              <p>{products.full_description}</p>
             
              <DetailsThumb images={imageThunal} tab={handleTab} myRef={myRef} />

              <button className="cart" style={{backgroundColor: '#5f0000'}}>Learn</button>
            </div>
          </div>
        ) : <BoxLoading />
      }
    </div>
  );
}

export default DetailPage;
//<img src={item.src[index]} alt="" />
//
// <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />