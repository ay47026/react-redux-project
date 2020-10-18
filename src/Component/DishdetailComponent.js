import React, { Component } from 'react';
// import { Media, CardImg } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Label, Col,Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import  { Control, LocalForm,Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

import { FadeTransform, Fade , Stagger } from 'react-animation-components';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
   
  constructor(props){
      super(props)
      this.state = {
        
          isModalOpen:false
      };
    
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
   


  }

  toggleModal() {
    this.setState({
        isModalOpen : !this.state.isModalOpen
    });
  }

  handleSubmit(values){
    console.log("Current state" + JSON.stringify(values));
    alert("Current state" + JSON.stringify(values));
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    
}


 
  
  render(){
    return(
      <div>

<Button outline onClick={this.toggleModal}>
      <span className="fa fa-edit fa-lg"></span> Submit comment
    </Button>
<Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Control.select>
                                </Col>
                            </Row>
                <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Author Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                               
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                </ModalBody>
            </Modal>
      </div>
     
    )
  }
}


  function RenderDish({dish}){
          return(
            <div className ="">
              <FadeTransform in transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                            <CardImg top width="100%" src={"assets/" +  dish.image} />
                            <CardBody>
                            <CardTitle>{dish.name} </CardTitle>
                            <CardText>{dish.description} </CardText>
                            </CardBody>
                    </Card>
              </FadeTransform>
            </div>
          );
}


function RenderComments({comments, postComment, dishId}){
 

      const comm =  comments.map((com) => {
          const c_date = new Date(com.date);
          const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
               
            return(
                <Fade in>
            
                <div  key={com.id}>
                 <p> {com.comment}</p>
                 <p>-- {com.author} ({com.rating}), {monthNames[c_date.getMonth()]} {c_date.getDate()} {c_date.getYear()}</p>
                </div>
                </Fade>
                
                
               
              );
        });
        
        return(
            
            <div>
           
           <div className="row mb-2">
           <div className="col-6"> <h4>Comments </h4></div>
               <div className="col-6"><CommentForm dishId={dishId} postComment={postComment}/></div>
               
           </div>
             
              
              <Stagger in >
            {comm}
            </Stagger>
            
            </div>
          );

  
}

const DishDetail = (props) => {

    if (props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
   
   else if (props.dish != null){
                 return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />

                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                      
                    </div>
                </div>
               
                </div>
            );
   }
}



export default DishDetail;