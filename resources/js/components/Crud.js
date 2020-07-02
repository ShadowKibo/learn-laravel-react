import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal, Form, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
function Crud() {
    const [lgShow, setLgShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [getAll, setGetAll] = useState([]);
    const [edit, setEdit] = useState(false);

    const resetHandler = () => {
        setName("");
        setEmail("");
    };

    const submitHandler = e => {
        e.preventDefault();
        let data = { name, email };
        //console.log(data);
        axios
            .post("/test", data)
            .then(res => {
                console.log(res);
                setLgShow(false);
                resetHandler();
                GetData();
                toast.success("Data inserted Successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    const DeleteHandler = name_id => {
        swal({
            title: "Are you sure?",
            text:
                "Once deleted, you will not be able to recover this imaginary data!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                axios
                    .delete("/test/" + name_id)
                    .then(response => {
                        if (response.status == 202) {
                            swal("Your Book List data has been deleted!", {
                                icon: "success"
                            });
                            GetData();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                swal("Your data is safe!");
            }
        });
    };

    const EditHandler = name_id => {
        setEdit(true);
        axios
            .get("/test/edit/" + name_id)
            .then(res => {
                setName(res.data.name);
                setEmail(response.data.email);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const GetData = () => {
        axios
            .get("/test/show")
            .then(response => {
                setGetAll(response.data);
                setLoading(true);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        GetData();
    }, []);

    return (
        <Fragment>
            <div className="text-center">
                <h1>Crud</h1>
                <Button onClick={() => setLgShow(true)}>Add</Button>
            </div>
            <div>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        GetData
                    ) : (
                        <Spinner animation="border" className="loading" />
                    )}
                    {getAll.map((data, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>
                                <Button
                                    className="btn btn-danger bts"
                                    size="sm"
                                    onClick={() => DeleteHandler(data.name_id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                                <Button
                                    className="btn btn-info bts"
                                    size="sm"
                                    onClick={() => EditHandler(data.name_id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );
}
export default Crud;
