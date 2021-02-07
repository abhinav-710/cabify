import React, {useContext,useState,useEffect} from 'react';
import {firebaseAuth} from '../provider/authprovider'
import {Navbar,Nav,Form,InputGroup,Button,FormControl,Row,Col,Card,Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import './HomenL.css';
const Home = (props) => {
  const { handleSignout, inputs, setInputs, errors } = useContext(firebaseAuth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelAdd =()=>{
    setShow(false);
    // console.log(adddate);
    // console.log(adddest);
    // console.log(addsrc);
    // console.log(maindate);
    if(!addsrc || !adddest|| !adddate )
    {
      setAdddst('');
      setAddsrc('');
      alert('Enter valid inputs!')
    }
    else{
      const email = inputs.email;
      const docObject = { 
        source:addsrc,
        destination:adddest,
        date:adddate,
        email:email};
      firebase.firestore().collection("requests").add(docObject);
      setAdddate(new Date());
      setAdddst('');
      setAddsrc('');
     
    }
  }
  const [addsrc,setAddsrc]=useState('');
  const [adddest,setAdddst]=useState('');
  const [adddate,setAdddate]=useState(null);
  const [data,setData]=useState([])
  const data1=[]
  useEffect(()=>{
    firebase.firestore().collection("requests").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
       // data1.push(doc);
        //setData(data1);
        //console.log(doc.data());
        data1.push(doc.data());
        console.log(data1);
        setData(data1);

    });
  });
  },[])
  console.log(data);
  const maindate=adddate;
  //console.log(adddate);
  // console.log(maindate);
  return (
    <div>
      <Navbar
        id="Navbar"
        className="navbar_main_container"
        bg="primary"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand className="navLinks navBrand" href="/">
          <h1>Cabify </h1>{" "}
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Navbar className="bg-light width-fix">
          <Col lg={3} className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Source"
              name="srch-term"
              id="srch-term"
            />
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </Col>
          <Col lg={3} className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Destination"
              name="srch-term"
              id="srch-term"
            />
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </Col>
          <Col lg={3} className="input-group">
            <input
              type="date"
              className="form-control"
              name="srch-term"
              id="srch-term"
            />
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </Col>
        </Navbar>
      </Row>
      <div
        className="navbar navbar-inverse navbar-static-top"
        id="navbar"
        role="navigation"
      >
        {/* {<Row>
		    <div className="navbar-header">
		        <a className="navbar-brand" rel="home" href="/" title="Dashboard">Cabify</a>
		    </div>
	    </Row>   */}
      </div>
      <Row>
        <Col lg={{ span: 3, offset: 1 }} id="box2">
          <h3>MY REQUESTS</h3>
          <Button variant="dark" onClick={handleShow} className="mr-sm-5">
            Launch demo modal
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Travel Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="Source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter starting point"
                    defaultValue={addsrc}
                    onChange={(e) => setAddsrc(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="Destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the destination"
                    default
                    Value={adddest}
                    onChange={(e) => setAdddst(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="Destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Enter the date"
                    defaultValue={adddate}
                    onChange={(e) => setAdddate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handelAdd}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {data.map((item) => {
            if(inputs.email===item.email){
            return (
              <Row>
                 <Card>
                  <div class="card-body">
                    <p className="card-title">Destination: {item.destination}</p>
                    <br></br>
                    <p className="card-text">Source: {item.source}</p>
                    <br></br>
                    <p className="card-text">Date: {item.date}</p>
                    <br></br>
                    <br></br>
                  </div>
                 </Card>
            </Row>
            ); 
            }
          })}
        </Col>

        <Col lg={7} xs={12}>
          {data.map((item) => {
            if(inputs.email!==item.email){
            return (
              <Row>
                <Card className="width-fix">
                  <h5 className="card-header">Journey</h5>
                  <div class="card-body">
                    <h5 className="card-title">Destination: {item.destination}</h5>
                    <p className="card-text">Source: {item.source}</p>
                    <p className="card-text">Date: {item.date}</p>
                    <p className="card-text">Contact: {item.email}</p>
                    <a href="#" className="btn btn-primary">
                      Accept
                    </a>
                  </div>
                </Card>
              </Row>
            ); 
            }
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Home;          
       
       
       
       
       
       
       
       