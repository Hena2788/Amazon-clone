import React from 'react'
import styles from "./header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BiSearch, BiCart } from "react-icons/bi";


const Header = () => {
  return (
    <>
  <section>
    <div className={styles.header_container}>
        <div className={styles.logo_container}>
            {/*logo */}
            <a href='/'><img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" /></a>
        
        {/*delivery */}
        <div className={styles.delivery}>
        <span>
            <SlLocationPin/>
            </span>
            <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
            </div>
        </div>
        </div>
        <div className={styles.search}>
            {/*search */}
            <select name="" id=""><option value="">All</option>
            </select>
            <input type="text" id='' placeholder='search product'/>
            <BiSearch size={25}/>
            {/*search icon */}

        </div>
        {/*right side */}
        <div>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_the_United_States_%28Web_Colors%29.svg/330px-Flag_of_the_United_States_%28Web_Colors%29.svg.png" alt="" />
                <section>
                    <option value="">EN</option>
                </section>
            </div>
            {/*components*/}
            <a href="">
            <div>
                <p>Sign in</p>
                <span>Account & Lists</span>
            </div>
            </a>
            {/*orders */}
        <a href="">
            <p>Returns</p>
            <span>& Orders</span>
        </a>
        {/*cart */}
        <a >
            <BiCart/>
            <div>
                <span>0</span>
            </div>
        </a>
      
        </div>
    </div>
  </section>
  </>
  )
}

export default Header