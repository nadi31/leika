import React, { useState, useLayoutEffect, useEffect } from "react";
import { Image, Button, Modal, InputNumber, message } from "antd";
//import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Table, Typography, Space } from "antd";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";

//Panier shopping

const Cart = (props) => {
  const [data, setData] = useState([]);
  const [seats, setSeats] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Toolbar hi from useEffect");
    // let itemsOrdered = refactorizedData();
    setData(JSON.parse(localStorage.getItem("cart") || "[]"));
    window.addEventListener("storage", storageEventHandler);
    //window.localStorage.setItem('test', '123')
    console.log("-" + data);
  }, []);
  const getSeats = (index) => {
    console.log("KEY" + index);
    let seats = 0;
    let dataSeats = JSON.parse(localStorage.getItem("cart") || "[]");
    if (dataSeats != []) {
      seats = dataSeats[index].seats;
    }
    return seats;
  };
  const storageEventHandler = () => {
    console.log("hi from storageEventHandler");
    // let itemsOrdered = refactorizedData();
    setData(JSON.parse(localStorage.getItem("cart") || "[]"));
  };
  const onContinue = () => {
    navigate("../recap", { replace: true });
  };
  const handleDelete = (key) => {
    let deleted = data;
    console.log("INDEX" + key);
    deleted.splice(key, 1);
    setData(deleted);
    console.log(data);

    localStorage.setItem("cart", JSON.stringify(deleted));
    window.dispatchEvent(new Event("storage"));
  };
  const handleSeats = (index, numberButton) => {
    let items = data;
    let changeData = data[index];
    console.log("INDEX" + changeData);

    switch (numberButton) {
      //if add
      case 1:
        if (changeData.seats < changeData.maxSeats) {
          console.log("ADD" + "1");
          changeData.seats = changeData.seats + 1;
          console.log("changedTO " + JSON.stringify(changeData));
          items.push(changeData);
          items.splice(index, 1);

          localStorage.setItem("cart", JSON.stringify(items));
          window.dispatchEvent(new Event("storage"));
        } else {
          console.log("ADD" + "2");
          message.info(
            "Il n'y a plus de place pour la date et l'heure sélectionnées"
          );
        }
        break;
      case 2:
        //if -
        if (changeData.seats - 1 == 0) {
          console.log("-" + "1");
          handleDelete(index);
        } else {
          console.log("-" + "2");

          changeData.seats = changeData.seats - 1;
          items.push(changeData);
          items.splice(index, 1);

          localStorage.setItem("cart", JSON.stringify(items));
          window.dispatchEvent(new Event("storage"));
        }
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "delete",
      width: "27%",
      dataIndex: props.width > 900 ? "" : "none",
      render: (key, record, index) => (
        <Space>
          {" "}
          <a
            onClick={() => {
              handleDelete(index);
            }}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
    props.width > 1200
      ? {
          width: "50%",

          dataIndex: props.width > 900 ? "img" : "none",
          render: (img) => (
            <Image
              preview={false}
              style={{ display: props.width > 1400 ? "flex" : "none" }}
              width={"100%"}
              height={"100%"}
              src={img}
            />
          ),
        }
      : {},
    {
      width: "35%",

      dataIndex: "name",
    },
    {
      width: "35%",

      dataIndex: "price",
    },
    {
      width: "35%",

      dataIndex: "currency",
    },

    {
      width: "70%",

      dataIndex: "seats",
      render: (seats, record, index) => (
        <>
          <Button
            style={{}}
            onClick={() => {
              handleSeats(index, 2);
            }}
          >
            -
          </Button>
          {"  " + data[index].seats + "  "}
          <Button
            style={{}}
            onClick={() => {
              handleSeats(index, 1);
            }}
          >
            +
          </Button>
        </>
      ),
    },
  ];

  /*
  const data = [
    {
      key: "1",
      name: "Cours de couture",
      price: 33,
      seats: 2,
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      key: "2",
      name: "Cours de patisserie",
      price: 80,
      seats: 4,
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];*/

  const refactorizedData = () => {
    let dataForBasket = JSON.parse(localStorage.getItem("cart") || "[]");
    //let dataForBasket = localStorage.getItem("cart")|| []

    console.log("DATA refactorized " + dataForBasket.length + dataForBasket);
    let result = [];

    for (let i = 0; i < dataForBasket.length; i++) {
      for (let y = 0; y < dataForBasket.length; y++) {
        if (
          dataForBasket[i].key == dataForBasket[y].key &&
          y != i &&
          dataForBasket[i].hourSelected.hour ==
            dataForBasket[y].hourSelected.hour &&
          dataForBasket[i].hourSelected.date ==
            dataForBasket[y].hourSelected.date
        ) {
          if (
            dataForBasket[y].seats + dataForBasket[i].seats >
            dataForBasket.maxSeats
          ) {
            dataForBasket[y].seats += dataForBasket[i].seats;

            result.push(dataForBasket[y]);
            dataForBasket.splice(y, 1);
            dataForBasket.splice(i, 1);
          } else {
            //message
            result.push(dataForBasket[y]);
            dataForBasket.splice(i, 1);
          }
          //console.log(dataForBasket[i].name)
        }
      }
    }
    dataForBasket.map((itemIsole, pos) => {
      result.map((groupe) => {
        if (
          itemIsole.key == groupe.key &&
          itemIsole.hourSelected.hour == groupe.hourSelected.hour &&
          itemIsole.hourSelected.date == groupe.hourSelected.date
        ) {
          groupe.seats += itemIsole.seats;
          dataForBasket.splice(pos, 1);
        }
      });
    });
    dataForBasket.map((itemIsole) => result.push(itemIsole));

    // return console.log(arrays);
    console.log(JSON.stringify(result));
    console.log(dataForBasket);
    //console.log(dataForBasket);

    return result;
  };

  const customStyles = {
    content: {
      height: "100%",
      //right: "auto",
      // marginLeft: props.width > 1000 ? "55%" : props.width >= 800 ? "40%" : "",
      //width: props.width > 1000 ? "40%" : props.width >= 800 ? "55%" : "80%",

      width: "30%",
    },
  };
  const { Text } = Typography;

  return (
    <div>
      {" "}
      <Modal
        style={{ top: "-1%", float: "right" }}
        visible={props.cart}
        onOk={() => props.setCart(false)}
        onCancel={() => props.setCart(false)}
        width={
          props.width >= 1500
            ? "45%"
            : props.width >= 1000
            ? props.width >= 400
              ? "90%"
              : "70%"
            : "70%"
        }
        footer={null}
        //onAfterOpen={afterOpenModal}

        contentLabel="Example Modal"
      >
        {" "}
        <div style={{ height: "1000px", width: "100%" }}>
          <h2 id="titreCart">
            Panier{" "}
            <ShoppingCartOutlined
              style={{ color: "#FFDD83", fontSize: "bold" }}
            />
            <div style={{ height: "1px", backgroundColor: "grey" }}></div>
          </h2>

          <div>
            {JSON.parse(localStorage.getItem("cart") || "[]").length > 0 ? (
              <>
                <Table
                  bordered={false}
                  showHeader={false}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{ x: 400, y: 500 }}
                  summary={(pageData) => {
                    let totalPrice = 0;

                    pageData.forEach(({ price, seats }) => {
                      totalPrice += price * seats;
                    });

                    return (
                      <>
                        <Table.Summary.Row id="summary">
                          <Table.Summary.Cell>Total</Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text>{totalPrice + "€"}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />{" "}
                <br />
                <Button
                  id="payer"
                  onClick={() => {
                    refactorizedData();
                    onContinue();
                  }}
                  style={{
                    borderRadius: "25px",
                    left: "70%",
                    width: "30%",
                    backgroundColor: "#ffd04f",
                  }}
                >
                  Valider le panier{" "}
                  <ShoppingCartOutlined
                    style={{ color: "#eb0a0c", fontSize: "bold" }}
                  />
                </Button>
              </>
            ) : (
              <div> Votre panier est vide.</div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
