import * as React from 'react';
import { Modal, Paper, Typography} from "@mui/material";
import CoolButton from './CoolButton';

const LoginButton = ({loginFunc, text, error}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = () => {
    loginFunc(handleOpen);
  }

  return(
    <div>
      <CoolButton onClick={handleLogin} message={text}/>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-describedby="PasswordError"
        >
          <Paper id="LoginPaper">
            <Typography id="PasswordError">
              {error}
            </Typography>
          </Paper>
      </Modal>
    </div>
  )
}

export default LoginButton;