import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import axios from "axios";

let x = [{}, {}];

export default function Home() {
  const [name, setName] = useState("xyz");

  const [product, setProduct] = useState([]);

  const [price, setPrice] = useState(0);

  const [id, setId] = useState(1);

  // let product = [];

  // console.log("home")

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    getData();
  }, [id, price]);

  async function getData() {
    try {
      //axios method  get  post, put delete

      let response = await axios.get("https://dummyjson.com/products/");

      console.log("response product length", response.data);

      let filterArray = response.data.products.filter((j) => {
        return j.price > price;
      });

      setProduct(filterArray);

      // setProduct([response.data]);

      // product = response.data.products;
    } catch (error) {
      console.log(error);
    }
    // https://dummyjson.com/products/1
  }

  // let name="abc"

  // name="piyush"

  // getData()

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product</h1>

      <div>
        {/* <h1>Total product:{product.length}</h1> */}
        <div>
          <div>
            <p>Filter by price</p>
          </div>

          <div>
            <input
              onChange={(e) => {
                console.log("e", e.target.value);

                setPrice(e.target.value);
              }}
            />
          </div>
        </div>

        {/* <input
          onChange={(e) => {

            console.log("e",e.target.value)


            setName(e.target.value);
          }}
        /> */}

        {product.map((item, index) => {
          console.log("item", index, item);

          return (
            <div
              style={{
                borderWidth: 1,
                backgroundColor: "lightgray",
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                marginRight: 20,
                marginLeft: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ flex: 1, }}>
                <h4>Name:{item.title}</h4>
                <h4>Brand:{item.brand}</h4>
                <h4>Price:{item.price}</h4>
              </div>

              <div style={{ flex: 2,  }}>
                {/* <p>image</p> */}

                {item.images.map((img) => {
                  return <img 
                  
                  style={{height:150,width:150,marginLeft:20,borderRadius:10}}
                  src={img}></img>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
