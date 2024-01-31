import * as React from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import CoolButton from './CoolButton';

const dummyClose = (modalClose) => {
  modalClose()
}

const LoginButton = ({loginFunc, closeFunc=dummyClose, errors, buttonText, buttonColor, textColor}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = () => {
    loginFunc(handleOpen);
  }

  const modalQuit = () => {
    closeFunc(handleClose);
  }

  return(
    <div>
      <CoolButton onClick={handleLogin} buttonText={buttonText} buttonColor={buttonColor} textColor={textColor}/>
      <Modal 
        className='modalWindow'
        open={open}
        onClose={modalQuit}
        aria-describedby="PasswordError"
        >
          <Paper id="errorPaper">
            <Typography id="PasswordError">
              {errors.username}<br/>
              {errors.password}
              {errors.error}
            </Typography>
          </Paper>
      </Modal>
    </div>
  )
}

export default LoginButton;