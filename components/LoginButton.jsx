import * as React from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import CoolButton from './CoolButton';

const LoginButton = ({loginFunc, error, buttonText, buttonColor, textColor}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = () => {
    loginFunc(handleOpen);
  }

  return(
    <div>
      <CoolButton onClick={handleLogin} buttonText={buttonText} buttonColor={buttonColor} textColor={textColor}/>
      <Modal 
        className='modalWindow'
        open={open}
        onClose={handleClose}
        aria-describedby="PasswordError"
        >
          <Paper id="errorPaper">
            <Typography id="PasswordError">
              {error.username}<br/>
              {error.password}
            </Typography>
          </Paper>
      </Modal>
    </div>
  )
}

export default LoginButton;