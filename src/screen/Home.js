import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import axios from "axios";

let x = [{}, {}];

export default function Home() {
  const [name, setName] = useState("xyz");

  const [product, setProduct] = useState([]);

  const [price, setPrice] = useState(0);

  const [cartItem, setCartItem] = useState([]);

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



  function fun1() {
    try {
      localStorage.setItem("userName","piyush")

      console.log("cartitem", cartItem);
    } catch (error) {
      console.log("error", error);
    }
  }


  async function getLocalData(){

let userName= await localStorage.getItem("userName")

console.log("userName",userName)
  }

  function addToCartFun(item) {
    try {
      console.log("cartItem", cartItem, item);

      // cartItem.push()

      setCartItem((prev) => {
        console.log("prev", prev);

        let filterItem = prev.filter((i) => i.id == item.id);

        console.log("filterItem", filterItem);

        if (filterItem.length > 0) {

          let updatedItem = prev.map((i) => {
            if (i.id == filterItem[0].id) {
              return { ...i, qty: filterItem[0].qty + 1 };
            } else {
              return i;
            }
          });

          console.log("updatedItem", updatedItem);

          return updatedItem;


        } else {
          let newData = [...prev, { ...item, qty: 1 }];

          console.log("newaData", newData);

          return newData;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

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

        <button onClick={fun1}>View cart item</button>
        <button onClick={getLocalData}>get localstorage data</button>

        {/* <input
          onChange={(e) => {

            console.log("e",e.target.value)


            setName(e.target.value);
          }}
        /> */}

        {product.map((item, index) => {
          // console.log("item", index, item);

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
              <div style={{ flex: 1 }}>
                <h4>Name:{item.title}</h4>
                <h4>Brand:{item.brand}</h4>
                <h4>Price:{item.price}</h4>
                <button
                  style={{
                    backgroundColor: "dodgerblue",
                    borderWidth: 0,
                    borderRadius: 5,
                  }}
                  onClick={() => {
                    addToCartFun(item);
                  }}
                >
                  <p
                    style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
                  >
                    Add to cart
                  </p>
                </button>
              </div>

              <div style={{ flex: 2 }}>
                {/* <p>image</p> */}

                {item.images.map((img) => {
                  return (
                    <img
                      style={{
                        height: 150,
                        width: 150,
                        marginLeft: 20,
                        borderRadius: 10,
                      }}
                      src={img}
                    ></img>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
