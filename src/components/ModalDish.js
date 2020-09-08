import React from 'react'
import { Modal, Card } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Imagen from '../assets/img/hotel-el-auca.jpg'

class ModalDish extends React.Component {

    handleChange = (e) => {
        /*         console.log({
                    name: e.target.name,
                    value: e.target.value
                }) */
        this.setState({
            plato: e.target.value
        })
    }

    handleClick = () => {
        console.log('click')
    }

    handleSumbit = (e) => {
        console.log('was submited')
    }

    render() {
        return (
            <div className="modaldish">
                <Modal
                    show={this.props.mostrar}
                    onHide={this.props.ocultar}
                    backdrop="static"
                    centered
                    dialogClassName="modal-90w"
                >

                    <Modal.Header closeButton id="id_header_modal">
                        <Modal.Title>Agregar plato</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="modaldish__container">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img src={Imagen}></Card.Img>
                            </Card>
                            <div className="modaldish__container-input">
                                <TextField
                                    id="standard-basic"
                                    label="Nombre plato"
                                    onChange={this.handleChange} />
                                <TextField
                                    id="standard-textarea"
                                    label="Descripción"
                                    multiline
                                    onChange={this.handleChange} />
                                <TextField id="standard-basic" label="Ingredientes" />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit"
                            className="login__form--submit"
                            onClick={this.handleClick}
                        >Continuar</button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

export default ModalDish

