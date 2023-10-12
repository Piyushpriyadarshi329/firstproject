import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import axios from "axios";

let x = [{}, {}];

export default function Home() {
  const [name, setName] = useState("xyz");

  // const [product, setProduct] = useState([]);

  let product = [];

  // console.log("home")

  // useEffect(()=>{

  //   getData()

  // },[])

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      //axios method  get  post, put delete

      let response = await axios.get("https://dummyjson.com/products/");

      console.log("response product length", response.data.products.length);

      // setProduct(response.data.products);

      product = response.data.products;
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
        <h1>Total product:{product.length}</h1>

        {product.map((item) => {
          console.log("item", item);

          return (
            <div>
              <h1>{item.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
