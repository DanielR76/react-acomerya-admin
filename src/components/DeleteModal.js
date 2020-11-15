import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function DeleteModal(props) {

    const handleClose = () => props.close(false)
    const handleDelete = () => {
        props.delete()
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás segur@ que deseas {props.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="outlined"
                        color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteModal