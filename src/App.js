import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        name:"",
        gender:"",
        accom:[],
        type:"",
        guest:"",
        date:"",
        dept:"",
        free:"",
        message:"",
        
        records:[],
        show: false,
        selectedName: "",
        selectedGender: "",
        selectedAccom: "",
        selectedType: [],
        selectedGuest: "",
        selectedDate: "",
        selectedDept: "",
        selectedFree: "",
        selectedMessage: "",
        seledtedId: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };


modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };



    saveSurvey = ()=> {

       
        var data = {name: this.state.name,
                    gender: this.state.gender,
                    accom: this.state.accom,
                    type: this.state.type,
                    guest: this.state.guest,
                    date: this.state.date,
                    dept: this.state.dept,
                    free: this.state.free,
                    message: this.state.message};
                   
         console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        color: data.color
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedGender: data.gender,
                        selectedAccom: data.accom,
                        selectedType: data.type,
                        selectedGuest: data.guest,
                        selectedDate: data.date,
                        selectedDept: data.dept,
                        selectedFree: data.free,
                        selectedMessage: data.message,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        gender: this.state.selectedGender,
                        accom: this.state.selectedAccom,
                        type: this.state.selectedType,
                        guest: this.state.selectedGuest,
                        date: this.state.selectedDate,
                        dept: this.state.selectedDept,
                        free: this.state.selectedFree,
                        message: this.state.selectedMessage,
                        };
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedGender: "" ,
                selectedAccom: [] ,
                selectedType: "" ,
                selectedGuest:"",
                selectedDate:"",
                selectedDept:"",
                selectedFree:"",
                selectedMessage:"",
                selectedName: ""
            });
        }
    };



    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                        <Button bsSize="xsmall" bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
                     
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.gender}</td>
                     <td>{
                         item.accom.map((accom, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{accom}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                     <td>{item.type}</td>
                     <td>{item.guest}</td>
                     <td>{item.date}</td>
                     <td>{item.dept}</td>
                     <td>{item.free}</td>
                     <td className="textfieldarea">{item.message}</td>
                     
                </tr>
            );
        });


        let close = () => this.setState({ show: false })


        return (
            <div className="container">
                <div className="page-header">
                <div className="todoAppHeader">
                    </div>
                </div>
                <div className="jumbotron">
                    
                                <Form>

                                <Grid>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <ControlLabel>Name</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Your Name"
                                                    value={this.state.name}
                                                    onChange={this.onChange('name')}
                                                    />
                                                <HelpBlock></HelpBlock>
                                            </FormGroup>

                                        </Col>
                                        <Col md={3}>
                                            <ControlLabel>Arrival Date</ControlLabel>
                                            
                                            <FormGroup>
                                                
                                                <FormControl
                                                    type="date"
                                                    value={this.state.date}
                                                    onChange={this.onChange('date')}
                                                    />
                                                    
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                            <ControlLabel>Departure Date</ControlLabel>
                                                <FormControl
                                                    type="date"
                                                    value={this.state.dept}
                                                    onChange={this.onChange('dept')}
                                                    />
                                                <HelpBlock></HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                                 <Table>
                                    
                                              <th><FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="Male"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="Female"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>
                                    </th>
                                  
                                    <th><FormGroup>
                                        <ControlLabel>Accomodation</ControlLabel>
                                        <Checkbox value="Luxurious"
                                                  checked={this.state.accom.indexOf('Luxurious')>=0 ? true:false}
                                                  onChange={this.checkboxChange('accom')}>
                                            Luxurious
                                        </Checkbox>
                                        <Checkbox value="Bungalow"
                                                  checked={this.state.accom.indexOf('Bungalow')>=0 ? true:false}
                                                  onChange={this.checkboxChange('accom')}>
                                            Bungalow
                                        </Checkbox>
                                        <Checkbox value="Villa"
                                                  checked={this.state.accom.indexOf('Villa')>=0 ? true:false}
                                                  onChange={this.checkboxChange('accom')}>
                                            Villa
                                        </Checkbox>
                                        
                                    </FormGroup></th>
                                    

                                    </Table>

                                   


                                    <FormGroup>
                                   
                                        <ControlLabel>Room Type</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="type here..."
                                                     value={this.state.type}
                                                     onChange={this.onChange('type')}
                                            >
                                            <option selected disabled>Type:</option>
                                            <option value="Master's-Bed">Master's-Bed</option>
                                            <option value="Mini-suite">Mini-Suite</option>
                                            <option value="Junior-suite">Junior-Suite</option>
                                        </FormControl>
                                        <HelpBlock></HelpBlock>
                                    
                                    </FormGroup>

                                     <FormGroup>
                                        <ControlLabel>No. of Guests</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="number here..."
                                                     value={this.state.guest}
                                                     onChange={this.onChange('guest')}
                                            >
                                            <option selected disabled>Guests:</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </FormControl>

                                        <HelpBlock></HelpBlock>
                                    </FormGroup>

                                    

                                    <Table>
                                        


                                    <th><FormGroup>
                                        <ControlLabel>Free Pickup?</ControlLabel>
                                        <Radio name="free" value="YES"
                                               onChange={this.onChange('free')}>YES Please!-Pick me up on arrival</Radio>
                                        <Radio name="free" value="NO"
                                               onChange={this.onChange('free')}>NO Thanks-I'll make my own way there</Radio>
                                    </FormGroup></th>

                                    <th><FormGroup>
                                            <ControlLabel>Special Requests:</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="your request....."
                                            value={this.state.message}
                                            onChange={this.onChange('message')}
                                            cols = "50"
                                            rows = "4"
                                                />
                                    </FormGroup></th>
                                    </Table>
                                    
                                    <ButtonGroup>

                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveSurvey}>Submit</Button>

                                    </ButtonGroup>
                                </Form>
                                </div>
                            <div className="jumbotron">
                            <h3 className="text-center">Guest Reservation</h3>
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Accomodation</th>
                                        <th>Type</th>
                                        <th>No.of Guests</th>
                                        <th>Arrival Date</th>
                                        <th>Departure Date</th>
                                        <th>Pick-up</th>
                                        <th>Requests</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                           
                          
                      </div>
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Guest Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>

                    <FormGroup>
                                                <ControlLabel>Name</ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Your Name"
                                                    value={this.state.selectedName}
                                                    onChange={this.modalonChange('selectedName')}
                                                    />
                                                <HelpBlock></HelpBlock>
                                            </FormGroup>

                                       
                                        <Col md={3}>
                                            <ControlLabel>Arrival Date</ControlLabel>
                                            
                                            <FormGroup>
                                                
                                                <FormControl
                                                    type="date"
                                                    value={this.state.selectedDate}
                                                    onChange={this.modalonChange('selectedDate')}
                                                    />
                                                    
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                            <ControlLabel>Departure Date</ControlLabel>
                                                <FormControl
                                                    type="date"
                                                    value={this.state.selectedDept}
                                                    onChange={this.modalonChange('selectedDept')}
                                                    />
                                                <HelpBlock></HelpBlock>
                                            </FormGroup>
                                        </Col>
                                    
                                 <Table>
                                    
                                              <th><FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="Male"
                                               onChange={this.modalonChange('selectedGender')}>Male</Radio>
                                        <Radio name="gender" value="Female"
                                               onChange={this.modalonChange('selectedGender')}>Female</Radio>
                                    </FormGroup>
                                    </th>
                                  
                                    <th><FormGroup>
                                        <ControlLabel>Accomodation</ControlLabel>
                                        <Checkbox value="Luxurious"
                                                  checked={this.state.selectedAccom.indexOf('Luxurious')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedAccom')}>
                                            Luxurious
                                        </Checkbox>
                                        <Checkbox value="Bungalow"
                                                  checked={this.state.selectedAccom.indexOf('Bungalow')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedAccom')}>
                                            Bungalow
                                        </Checkbox>
                                        <Checkbox value="Villa"
                                                  checked={this.state.selectedAccom.indexOf('Villa')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedAccom')}>
                                            Villa
                                        </Checkbox>
                                        
                                    </FormGroup></th>
                                    

                                    </Table>

                                   


                                    <FormGroup>
                                   
                                        <ControlLabel>Room Type</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="type here..."
                                                     value={this.state.selectedType}
                                                     onChange={this.modalonChange('selectedType')}
                                            >
                                            <option selected disabled>Type:</option>
                                            <option value="Master's-Bed">Master's-Bed</option>
                                            <option value="Mini-suite">Mini-Suite</option>
                                            <option value="Junior-suite">Junior-Suite</option>
                                        </FormControl>
                                        <HelpBlock></HelpBlock>
                                    
                                    </FormGroup>

                                     <FormGroup>
                                        <ControlLabel>No. of Guests</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="number here..."
                                                     value={this.state.selectedGuest}
                                                     onChange={this.modalonChange('selectedGuest')}
                                            >
                                            <option selected disabled>Guests:</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </FormControl>

                                        <HelpBlock></HelpBlock>
                                    </FormGroup>

                                    

                                    <Table>
                                        


                                    <th><FormGroup>
                                        <ControlLabel>Free Pickup?</ControlLabel>
                                        <Radio name="free" value="YES"
                                               onChange={this.modalonChange('selectedFree')}>YES Please!-Pick me up on arrival</Radio>
                                        <Radio name="free" value="NO"
                                               onChange={this.modalonChange('selectedFree')}>NO Thanks-I'll make my own way there</Radio>
                                    </FormGroup></th>

                                    <th><FormGroup>
                                            <ControlLabel>Special Requests:</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="your request....."
                                            value={this.state.selectedMessage}
                                            onChange={this.modalonChange('selectedMessage')}
                                            cols = "50"
                                            rows = "4"
                                                />
                                    </FormGroup></th>
                                    </Table>
                                    
                                    <ButtonGroup>

                                        <Button bsStyle="primary" bsSize="large" onClick={this.saveEdit(this.state.selectedId)}>Submit</Button>

                                    </ButtonGroup>
                                </Form>

                                </Modal.Body>
                        </Modal>
                
                </div>
            </div>
        );
    }
}

export default App;
