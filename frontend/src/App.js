import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoginPage from './LoginPage';
import { ListGroup, Button, FormGroup, Dropdown } from "react-bootstrap";
import PosItem from './PosItem';
import './index.css';
import ScrollArea from 'react-scrollbar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
//import style from 'bootstrap/dist/css/bootstrap.css';
import { timingSafeEqual } from 'crypto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class App extends Component {
    constructor(props){
      super(props);
      this.state = {      //state data
          data: [],
          itemNumber: '',
          itemName: '',
          itemQuantity: '',
          itemPrice: '',
          qInventory:[],
          clocked:false,
          adminView:"none",
          adminViewColumns: [],
          adminViewData:[],
          addItemNumber: null,
          cart: {},
          cartID: {},
          cartPrices: {},
          inventoryViewColumns: [],
          inventoryViewData: [],
          inventoryView:""
      }
      //bindings for functions
      this.addItem = this.addItem.bind(this);
      this.Scroll = this.Scroll.bind(this);
      this.addItemToDB = this.addItemToDB.bind(this);
      this.changeAddItemToDB = this.changeAddItemToDB.bind(this);
      this.clockIn = this.clockIn.bind(this);
      this.clockOut = this.clockOut.bind(this);
      this.getAdminView = this.getAdminView.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.checkOut = this.checkOut.bind(this);
      this.getInventoryView = this.getInventoryView.bind(this);
    }
    //toast messages for errors
  newItemError = () => toast.error("Please fill out all boxes!");
  itemNotFoundError = () => toast.error("Item Not Found!");
  empptyCartError = () => toast.error("Cart is Empty!");
  //when checking out
 
  checkOut(){
    var cartSize = Object.keys(this.state.cart).length;
    if (cartSize < 1){  //cart empty
      this.empptyCartError();
    }else{    //post to checkout, send cart data
      fetch('/api/checkOut',{
        method:'POST',
        body:JSON.stringify ({"cart":this.state.cart, "employee":localStorage.getItem('currUser'), "cartPrices":this.state.cartPrices}),
        headers: {
            'Content-Type': 'application/json'
        }
      });
    }
      //delete cart stuff from UI and state variables
      this.setState({cart: {}, cartPrices: {}});
      this.setState({data: []});
      this.setState({addItemNumber:""});
    }
  handleChange(event){
      //update data when inputbox is updated
      this.setState({
          [event.target.name]: event.target.value
      });
  }
  getInventoryView(e){
    //inventory view, POST to api endpoint
    this.state.inventoryView = e.target.name;
    fetch('/api/getItemsFromInventory',{
      method:'POST',
      body: JSON.stringify ({"view":this.state.inventoryView}),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200){
          return res.json()
      }
    })
    .then((data) => {
      //get result from API endpoint and display it
        this.setState({inventoryViewData:data.qresult});
        var resu = data;
        if (this.state.inventoryView == "view9"){
          this.setState({inventoryViewColumns:[{
            Header: 'Item Number',
            accessor: 'Item_no' 
          }, {
            Header: 'Item Name',
            accessor: 'Name'
          }, {
            Header: 'Item Quantity',
            accessor: 'Quantity'
          }, {
            Header: 'Item Price',
            accessor: 'Unit_price'
          }]});
        }else if (this.state.inventoryView == "view5"){
          this.setState({inventoryViewColumns:[{
            Header: 'Item Number',
            accessor: 'item_no' 
          }, {
            Header: 'Unit Price',
            accessor: 'unit_price'
          }]});
        }
    });

  }
  getAdminView(e){
    //views from admin page
    this.state.adminView = e.target.name;
    //POST api for data (using JSON)
    fetch('/api/getAdminView',{
      method:'POST',
      body:JSON.stringify ({"adminView":this.state.adminView}),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200){
          return res.json()
      }
    })
    .then((data) => {
        //updating views
        this.setState({adminViewData: data.qresult});
        if (this.state.adminView == "view2"){
          this.setState({adminViewColumns:[{
            Header: 'Employee Number',
            accessor: 'Employee_no' 
          }, {
            Header: 'Transaction Number',
            accessor: 'transaction_num'
          }, {
            Header: 'Total Amount Sold',
            accessor: 'Total_amount_sold'
          }, {
            Header: 'Total Quantity Price',
            accessor: 'Total_qty'
          }]});
        }else if (this.state.adminView == "view3"){
          this.setState({adminViewColumns:[{
            Header: 'First Name',
            accessor: 'Fname' 
          }, {
            Header: 'Last Name',
            accessor: 'Lname'
          }, {
            Header: 'Salary',
            accessor: 'Salary'
          }]});
        }else if (this.state.adminView == "view10"){
          this.setState({adminViewColumns:[{
            Header: 'Employee Number',
            accessor: 'Employee_no' 
          }, {
            Header: 'Transaction Number',
            accessor: 'transaction_num'
          }, {
            Header: 'Total Amount Sold ($)',
            accessor: 'Total_amount_sold'
          },{
            Header: 'Quantity Sold',
            accessor: 'Total_qty'
          }
        ]});
        }else if(this.state.adminView == "view8"){
          this.setState({adminViewColumns:[{
            Header: 'First Name',
            accessor: 'Fname' 
          }, {
            Header: 'Last Name',
            accessor: 'Lname'
          }, {
            Header: 'Birthday',
            accessor: 'Bdate'
          },{
            Header: 'Address',
            accessor: 'Address'
          }
          ,{
            Header: 'Gender',
            accessor: 'Gender'
          },{
            Header: 'Salary',
            accessor: 'Salary'
          },{
            Header: 'Employee Number',
            accessor: 'Employee_no'
          },{
            Header: 'Admin',
            accessor: 'Admin'
          }
        ]});
        }else if (this.state.adminView == "view10"){
          this.setState({adminViewColumns:[{
            Header: 'Employee Number',
            accessor: 'Employee_no' 
          }, {
            Header: 'Transaction Number',
            accessor: 'transaction_num'
          }, {
            Header: 'Total Amount Sold ($)',
            accessor: 'Total_amount_sold'
          },{
            Header: 'Quantity Sold',
            accessor: 'Total_qty'
          }
        ]});
        }else if(this.state.adminView == "view6"){
          this.setState({adminViewColumns:[{
            Header: 'Employee Number',
            accessor: 'Employee_no'
          },{
            Header: 'First Name',
            accessor: 'Fname' 
          }, {
            Header: 'Last Name',
            accessor: 'Lname'
          }, {
            Header: 'Date',
            accessor: 'date'
          }
        ]});
        }else if(this.state.adminView == "view7"){
          this.setState({adminViewColumns:[{
            Header: 'Employee Number',
            accessor: 'Employee_no'
          },{
            Header: 'Date',
            accessor: 'Date' 
          }, {
            Header: 'Time In',
            accessor: 'Cin'
          }, {
            Header: 'Time Out',
            accessor: 'Cout'
          }
        ]});
        }
    });


  }
  clockIn(){
    //send request to server for click in
    this.setState({clocked:true});
    fetch('/api/clockIn',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    });
  }
  clockOut(){
    //send request to server for clock out
    this.setState({clocked:false});
    fetch('/api/clockOut',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    });
  }
  
  addItemToDB(){
    //add new item to database
    if (this.state.itemNumber=='' || this.state.itemName == '' || this.state.itemQuantity == '' || this.state.itemPrice == ''){
      this.newItemError();
    }else{
      fetch('/api/addItemToDB',{
        method:'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      this.setState({itemNumber:'',itemName:'',itemQuantity:'',itemPrice: ''});


    }
  }
  changeAddItemToDB(){
        //update variables when input box is updateed
        this.setState({
            [event.target.name]: event.target.value
        });
  }
  clicked(e) {
    //user is logging out
    localStorage.removeItem("currUser");
    this.props.history.push('/');
  }
  Scroll(){
    //scroll page when user adds more items to cart
    var element = document.getElementById('scroll');
    element.scrollTo({ top: element.scrollHeight+element.scrollTop, behavior: 'smooth' });
  }
  addItem(e){
    //addint item to cart
    if (this.state.addItemNumber == null || this.state.addItemNumber == "") {
      //if no item is added
      this.itemNotFoundError();
    }else{
      //POST API endpoint to check if item exists
      fetch('/api/checkItemExistence',{
        method:'POST',
        body:JSON.stringify ({"itemNumber":this.state.addItemNumber}),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200){
            return res.json()
        }
      })
      .then((data) => {
        
          var name;
          var unitPrice;
          var success = data.success;
          if (success == "false"){
            this.itemNotFoundError();
            this.setState({addItemNumber:""});

          }else{
            unitPrice = unitPrice = JSON.stringify(data.qresult[0]["Unit_price"]);
            name = data.qresult[0]["Name"];
            if (this.state.cart[this.state.addItemNumber] == undefined){
              this.state.cart[this.state.addItemNumber] = 1;
            }else{
              this.state.cart[this.state.addItemNumber] += 1;
            }
            this.state.cartPrices[this.state.addItemNumber] = unitPrice;
            let newItem = { item: name, price: unitPrice};
            this.setState({
                data: [...this.state.data, newItem],
            });
            this.Scroll();
            this.setState({addItemNumber:""});
          }
      });

    }


  }
  render() {

    var data = this.state.qInventory;
    var columns = [{
      Header: 'Item Number',
      accessor: 'Item_no' 
    }, {
      Header: 'Item Name',
      accessor: 'Name'
    }, {
      Header: 'Item Quantity',
      accessor: 'Quantity'
    }, {
      Header: 'Item Price',
      accessor: 'Unit_price'
    }]







    let addItemRender = this.state.data.map( (data, index) => {
      return (
          <PosItem key={index} item={data.item} price={data.price}/>
      )
    });

    return (

      <div>
        <Tabs>
          <TabList className="tabs">
            <Tab>Checkout</Tab>
            <Tab>Employee Clock In</Tab>
            <Tab>Manage Inventory</Tab>
            {localStorage.getItem('isAdmin') == 'true' && <Tab>Admin</Tab>}

          </TabList>

          <TabPanel>
            <div id="outer">

                <div id="scroll" refs="scroll">
                    {addItemRender}
                </div>

                    <div id="footer">
                      <div>
                      <FormGroup>
                          <input
                              className="number_item"
                              type="number"
                              name="addItemNumber"
                              value={this.state.addItemNumber}
                              onChange={this.handleChange}
                          />
                      </FormGroup>

                      </div>

                      <Button className= "additem_button" onClick={this.addItem}>Add Item</Button>
                      <Button className= "checkout_button" onClick={this.checkOut}>Check Out</Button>
                     </div>


            </div>
          </TabPanel>
          <TabPanel>
          <div className= "clockin">
            {!this.state.clocked && <button className="clockinbutton" onClick={this.clockIn}>Clock In</button>}
            {this.state.clocked && <button className="clockinbutton" onClick={this.clockOut}>Clock Out</button>}
            <a href="#" onClick={this.clicked}>Logout</a>
            </div>
          </TabPanel>

          <TabPanel>
            <div id="inventoryTable">
                    // <div >
                        <FormGroup className="inventory_info">
                          <input  className="logininfo"
                              type="number"
                              min="0"
                              step="1"
                              name="itemNumber"
                              value={this.state.itemNumber}
                              placeholder="Item Number"
                              onChange={this.changeAddItemToDB}
                          />
                          <input   className="logininfo"
                              type="text"
                              name="itemName"
                              value={this.state.itemName}
                              placeholder="Item Name"
                              onChange={this.changeAddItemToDB}
                          />
                          <input  className="logininfo"
                              type="number"
                              min="0"
                              step="1"
                              name="itemQuantity"
                              value={this.state.itemQuantity}
                              placeholder="Item Quantity"
                              onChange={this.changeAddItemToDB}
                          />
                          <input  className="logininfo"
                              type="number"
                              min="0"
                              name="itemPrice"
                              value={this.state.itemPrice}
                              placeholder="Item Price"
                              onChange={this.changeAddItemToDB}
                          />
                        </FormGroup>
                        // </div>
              <Button onClick={this.addItemToDB}>Add Item</Button>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  View Data
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.getInventoryView} name="view9">All Inventory</Dropdown.Item>
                  <Dropdown.Item onClick={this.getInventoryView} name="view5">Items with less than 25 quantity</Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
              <ReactTable
                  data={this.state.inventoryViewData}
                  columns={this.state.inventoryViewColumns}

                />
            </div>
          </TabPanel>
          <TabPanel>
            <div id="adminPage">

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  View Data
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.getAdminView} name="view2">Transactions from Employees with Salary > $15000</Dropdown.Item>
                  <Dropdown.Item onClick={this.getAdminView} name="view3">Employees making more than AVG</Dropdown.Item> 
                  <Dropdown.Item onClick={this.getAdminView} name="view6">When Employees worked</Dropdown.Item>
                  <Dropdown.Item onClick={this.getAdminView} name="view10">View All Transactions</Dropdown.Item>
                  <Dropdown.Item onClick={this.getAdminView} name="view8">All Employee Data</Dropdown.Item>
                  <Dropdown.Item onClick={this.getAdminView} name="view7">Detailed Timesheet log</Dropdown.Item>
                  <Dropdown.Item onClick={this.getAdminView} name="view4">Transactions By Employees</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ReactTable
                  data={this.state.adminViewData}
                  columns={this.state.adminViewColumns}

                />
            </div>

          </TabPanel>
        </Tabs>


      </div>

    );
  }
}

export default App;
