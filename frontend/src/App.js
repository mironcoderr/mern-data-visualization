import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function App() {

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [color, setColor] = useState('');
    const [rating, setRating] = useState('');
    const [user, setUser] = useState([]);

    const handleFormButton = ()=> {
        axios.post('http://localhost:8000/users', {
            title: title,
            brand: brand,
            image: image,
            color: color,
            rating: rating,
        });
    }

    const handleTrashButton = (userid) => {
        axios.delete(`http://localhost:8000/users/${userid}`);
    }

    useEffect(()=> {
        async function userData() {
            const { data } = await axios.get('http://localhost:8000/users');
            setUser(data);
        }
        userData();
    }, []);

    return (
        <>
        <Container className="product-container">
            <Row>
                <Col xl={6} className="mx-auto">
                    <h1 className="page-title">data visualisation</h1>
                    <Form className="product-form">
                        <Form.Control type="text"   placeholder="Enter Product Title"   onChange={(event)=> setTitle(event.target.value)}/>
                        <Form.Control type="text"   placeholder="Enter Brand Name"      onChange={(event)=> setBrand(event.target.value)}/>
                        <Form.Control type="text"   placeholder="Enter Image URL"       onChange={(event)=> setImage(event.target.value)}/>
                        <Form.Control type="text" placeholder="Enter Rating Number"   onChange={(event)=> setRating(event.target.value)}/>
                        <Form.Control type="color" onChange={(event)=> setColor(event.target.value)}/>
                        <Button variant="primary" type="submit" onClick={handleFormButton}>Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center">
                {user.map((item, index)=> {
                    return (
                        <Col xl={3} key={ item._id }>
                            <div className="product-card">
                                <div className="product-media">
                                    <span className="product-index" style={{ backgroundColor: item.color }}>{ `0${index + 1}` }</span>
                                    <img className="product-img" src={ item.image } alt="product" />
                                    <form className="product-action">
                                        <button type="button" className="edit-btn"><BiEdit /></button>
                                        <button type="submit" className="trash-btn" onClick={()=> handleTrashButton(item._id)}><BiTrash /></button>
                                    </form>
                                </div>
                                <div className="product-meta">
                                    <div className="product-rate">
                                        { item.rating >= 1 ? <BsStarFill /> : item.rating >= .5 ? <BsStarHalf /> : <BsStar /> }
                                        { item.rating >= 2 ? <BsStarFill /> : item.rating >= 1.5 ? <BsStarHalf /> : <BsStar /> }
                                        { item.rating >= 3 ? <BsStarFill /> : item.rating >= 2.5 ? <BsStarHalf /> : <BsStar /> }
                                        { item.rating >= 4 ? <BsStarFill /> : item.rating >= 3.5 ? <BsStarHalf /> : <BsStar /> }
                                        { item.rating >= 5 ? <BsStarFill /> : item.rating >= 4.5 ? <BsStarHalf /> : <BsStar /> }
                                    </div>
                                    <h4 className="product-brand">{ item.brand }</h4>
                                </div>
                                <h3 className="product-title">{ item.title }</h3>
                                <button className="product-btn">add to cart</button>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
        </>
    );
}

