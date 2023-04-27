import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userOrder } from "../api/api";
import product from "../css-js/images/product/01.jpg";

const Order_list = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    fetchOrderData();
  }, []);
  const orderID = "";

  const fetchOrderData = async () => {
    const response = await userOrder(orderID);

    console.log("order data--" + JSON.stringify(response.results));
    setOrderData(response.results);
  };

  const gerOrderDetails = (orderID) => {
    localStorage.setItem("orderId", orderID);
    navigate(`/orderDetails`);
  };
  return (
    <div>
      {" "}
      <section
        className="inner-section single-banner"
        //   style="background: url(images/single-banner.jpg) no-repeat center"
      >
        <div className="container">
          <h2>Order History</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Orderlist
            </li>
          </ol>
        </div>
      </section>
      <section className="inner-section orderlist-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="orderlist-filter">
                <h5>
                  total order <span>- ({orderData.length})</span>
                </h5>
                <div className="filter-short">
                  <label className="form-label">short by:</label>
                  <select className="form-select">
                    <option value="all" selected>
                      all order
                    </option>
                    <option value="recieved">recieved order</option>
                    <option value="processed">processed order</option>
                    <option value="shipped">shipped order</option>
                    <option value="delivered">delivered order</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {orderData.map((odata, id) => {
                return (
                  <>
                    <div className="orderlist">
                      <div className="orderlist-head">
                        <h5>order {id + 1}</h5>
                        <h5>order recieved</h5>
                      </div>
                      <div className="orderlist-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="order-track">
                              <ul className="order-track-list">
                                <li className="order-track-item active">
                                  <i className="icofont-check"></i>
                                  <span>order recieved</span>
                                </li>
                                <li className="order-track-item">
                                  <i className="icofont-close"></i>
                                  <span>order processed</span>
                                </li>
                                <li className="order-track-item">
                                  <i className="icofont-close"></i>
                                  <span>order shipped</span>
                                </li>
                                <li className="order-track-item">
                                  <i className="icofont-close"></i>
                                  <span>order delivered</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div
                            className="col-lg-5"
                            onClick={gerOrderDetails.bind(this, odata.order_id)}
                          >
                            <ul className="orderlist-details">
                              <li>
                                <h6>order id</h6>
                                <p>{odata.order_id}</p>
                              </li>
                              <li>
                                <h6>Total Item</h6>
                                <p>
                                  {odata.total_order_product_quantity} Items
                                </p>
                              </li>
                              <li>
                                <h6>Order Time</h6>
                                <p>
                                  {moment(odata.order_date).format(
                                    "DD-MM-YYYY"
                                  )}
                                </p>
                              </li>
                              <li>
                                <h6>Delivery Time</h6>
                                <p>
                                  {" "}
                                  {moment(odata.delivery_date).format(
                                    "DD-MM-YYYY"
                                  )}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-4">
                            <ul className="orderlist-details">
                              {/* <li>
                                <h6>Sub Total</h6>
                                <p>₹{Number(odata.total_amount).toFixed(2)}</p>
                              </li> */}
                              <li>
                                <h6>Total Tax</h6>
                                <p>₹{Number(odata.total_gst).toFixed(2)}</p>
                              </li>
                              <li>
                                <h6>discount</h6>
                                <p>{Number(odata.total_discount).toFixed(2)}</p>
                              </li>
                              <li>
                                <h6>delivery fee</h6>
                                <p>
                                  ₹{Number(odata.shipping_charges).toFixed(2)}
                                </p>
                              </li>
                              <li>
                                <h6>
                                  Total<small>(Incl. VAT)</small>
                                </h6>
                                <p>₹{Number(odata.total_amount).toFixed(2)}</p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-3">
                            <div className="orderlist-deliver">
                              <h6>Delivery location</h6>
                              <p>
                                jalkuri, fatullah, narayanganj-1420. word no-09,
                                road no-17/A
                              </p>
                            </div>
                          </div>
                          {/* <div className="col-lg-12">
                            <div className="table-scroll">
                              <table className="table-list">
                                <thead>
                                  <tr>
                                    <th scope="col">Serial</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">brand</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="table-serial">
                                      <h6>01</h6>
                                    </td>
                                    <td className="table-image">
                                      <img
                                        src={odata.cover_image}
                                        alt="product"
                                      />
                                    </td>
                                    <td className="table-name">
                                      <h6>{odata.name}</h6>
                                    </td>
                                    <td className="table-price">
                                      <h6>
                                        ₹ {odata.price}/
                                        <small>{odata.unit}</small>
                                      </h6>
                                    </td>
                                    <td className="table-brand">
                                      <h6>{odata.brand}</h6>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* <div className="orderlist">
                <div className="orderlist-head">
                  <h5>order#02</h5>
                  <h5>order Processed</h5>
                </div>
                <div className="orderlist-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="order-track">
                        <ul className="order-track-list">
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order recieved</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order processed</span>
                          </li>
                          <li className="order-track-item">
                            <i className="icofont-close"></i>
                            <span>order shipped</span>
                          </li>
                          <li className="order-track-item">
                            <i className="icofont-close"></i>
                            <span>order delivered</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <ul className="orderlist-details">
                        <li>
                          <h6>order id</h6>
                          <p>14667</p>
                        </li>
                        <li>
                          <h6>Total Item</h6>
                          <p>6 Items</p>
                        </li>
                        <li>
                          <h6>Order Time</h6>
                          <p>7th February 2021</p>
                        </li>
                        <li>
                          <h6>Delivery Time</h6>
                          <p>12th February 2021</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul className="orderlist-details">
                        <li>
                          <h6>Sub Total</h6>
                          <p>$10,864.00</p>
                        </li>
                        <li>
                          <h6>discount</h6>
                          <p>$20.00</p>
                        </li>
                        <li>
                          <h6>delivery fee</h6>
                          <p>$49.00</p>
                        </li>
                        <li>
                          <h6>
                            Total<small>(Incl. VAT)</small>
                          </h6>
                          <p>$10,874.00</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <div className="orderlist-deliver">
                        <h6>Delivery location</h6>
                        <p>
                          jalkuri, fatullah, narayanganj-1420. word no-09, road
                          no-17/A
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="table-scroll">
                        <table className="table-list">
                          <thead>
                            <tr>
                              <th scope="col">Serial</th>
                              <th scope="col">Product</th>
                              <th scope="col">Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">brand</th>
                              <th scope="col">quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-serial">
                                <h6>01</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Fresh Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>02</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Radhuni Masala</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>5</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>03</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Pran Prio</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>2</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>04</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Real Food</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>05</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Rdhuni Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>7</h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orderlist">
                <div className="orderlist-head">
                  <h5>order#03</h5>
                  <h5>order shipped</h5>
                </div>
                <div className="orderlist-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="order-track">
                        <ul className="order-track-list">
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order recieved</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order processed</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order shipped</span>
                          </li>
                          <li className="order-track-item">
                            <i className="icofont-close"></i>
                            <span>order delivered</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <ul className="orderlist-details">
                        <li>
                          <h6>order id</h6>
                          <p>14667</p>
                        </li>
                        <li>
                          <h6>Total Item</h6>
                          <p>6 Items</p>
                        </li>
                        <li>
                          <h6>Order Time</h6>
                          <p>7th February 2021</p>
                        </li>
                        <li>
                          <h6>Delivery Time</h6>
                          <p>12th February 2021</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul className="orderlist-details">
                        <li>
                          <h6>Sub Total</h6>
                          <p>$10,864.00</p>
                        </li>
                        <li>
                          <h6>discount</h6>
                          <p>$20.00</p>
                        </li>
                        <li>
                          <h6>delivery fee</h6>
                          <p>$49.00</p>
                        </li>
                        <li>
                          <h6>
                            Total<small>(Incl. VAT)</small>
                          </h6>
                          <p>$10,874.00</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <div className="orderlist-deliver">
                        <h6>Delivery location</h6>
                        <p>
                          jalkuri, fatullah, narayanganj-1420. word no-09, road
                          no-17/A
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="table-scroll">
                        <table className="table-list">
                          <thead>
                            <tr>
                              <th scope="col">Serial</th>
                              <th scope="col">Product</th>
                              <th scope="col">Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">brand</th>
                              <th scope="col">quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-serial">
                                <h6>01</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Fresh Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>02</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Radhuni Masala</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>5</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>03</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Pran Prio</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>2</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>04</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Real Food</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>05</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Rdhuni Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>7</h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orderlist">
                <div className="orderlist-head">
                  <h5>order#04</h5>
                  <h5>order delivered</h5>
                </div>
                <div className="orderlist-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="order-track">
                        <ul className="order-track-list">
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order recieved</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order processed</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order shipped</span>
                          </li>
                          <li className="order-track-item active">
                            <i className="icofont-check"></i>
                            <span>order delivered</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <ul className="orderlist-details">
                        <li>
                          <h6>order id</h6>
                          <p>14667</p>
                        </li>
                        <li>
                          <h6>Total Item</h6>
                          <p>6 Items</p>
                        </li>
                        <li>
                          <h6>Order Time</h6>
                          <p>7th February 2021</p>
                        </li>
                        <li>
                          <h6>Delivery Time</h6>
                          <p>12th February 2021</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul className="orderlist-details">
                        <li>
                          <h6>Sub Total</h6>
                          <p>$10,864.00</p>
                        </li>
                        <li>
                          <h6>discount</h6>
                          <p>$20.00</p>
                        </li>
                        <li>
                          <h6>delivery fee</h6>
                          <p>$49.00</p>
                        </li>
                        <li>
                          <h6>
                            Total<small>(Incl. VAT)</small>
                          </h6>
                          <p>$10,874.00</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <div className="orderlist-deliver">
                        <h6>Delivery location</h6>
                        <p>
                          jalkuri, fatullah, narayanganj-1420. word no-09, road
                          no-17/A
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="table-scroll">
                        <table className="table-list">
                          <thead>
                            <tr>
                              <th scope="col">Serial</th>
                              <th scope="col">Product</th>
                              <th scope="col">Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">brand</th>
                              <th scope="col">quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-serial">
                                <h6>01</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Fresh Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>02</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Radhuni Masala</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>5</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>03</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Pran Prio</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>2</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>04</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Real Food</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>3</h6>
                              </td>
                            </tr>
                            <tr>
                              <td className="table-serial">
                                <h6>05</h6>
                              </td>
                              <td className="table-image">
                                <img src={product} alt="product" />
                              </td>
                              <td className="table-name">
                                <h6>product name</h6>
                              </td>
                              <td className="table-price">
                                <h6>
                                  $19<small>/kilo</small>
                                </h6>
                              </td>
                              <td className="table-brand">
                                <h6>Rdhuni Company</h6>
                              </td>
                              <td className="table-quantity">
                                <h6>7</h6>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" to="">
                    <i className="icofont-arrow-left"></i>
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link active" to="">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="">
                    3
                  </Link>
                </li>
                <li className="page-item">...</li>
                <li className="page-item">
                  <Link className="page-link" to="">
                    65
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="">
                    <i className="icofont-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order_list;
