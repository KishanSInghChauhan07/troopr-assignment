import React,{useEffect,useState} from "react";
import { Card, Button,TableBody,TableCell,TableContainer,Paper,TableHead,Table,TableRow, Avatar,Modal,Backdrop,Popper,Fade} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddUserDatails from '../AddUserDatails/AddUserDetails.Component'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditUserDatails from '../EditUserDetails/EditUserDetails'


const HomePage = () => {
    const [feed,setFeed ] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [pop, setPop] = React.useState(false);
  
    useEffect(() => {
        fetch('/all').then(res => res.json())
        .then(result => {
            console.log(result.data);
            setFeed(result.data)
            
        })
    },[])    
    

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpenEdit = () => {
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setPop((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

    return(
        <>
            <Card className="shadow">
            <div style={{width:'80%',margin:'3% auto',display:'flex'}}>
                <h3 style={{fontWeight:'600'}}>User Directory</h3>
                <Button variant="contained" color="primary" style={{marginLeft:'auto'}} onClick={handleOpen} className="modal-button"><AddCircleIcon style={{margin:'0 5px 0 0',height:'20px'}} />Add New User</Button>
            </div>
            </Card>
            <Paper style={{width:'80%',margin:'25px auto 25px auto'}} className="shadow">
                <TableContainer className="">
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                            <TableCell>
                              USER NAME
                            </TableCell>
                            <TableCell>
                              ADDRESS
                            </TableCell>
                            <TableCell>
                              CONTACT
                            </TableCell>
                            <TableCell>
                              EMAIL
                            </TableCell>
                            <TableCell>
                              
                            </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                            {feed.map((data,i) =>{
                                return(
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        <TableCell className="d-flex align-items-center">
                                            <Avatar alt="user pic" src={data.image} /><span className="ml-3">{data.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            {data.address}
                                        </TableCell>
                                        <TableCell>
                                            {data.phone}
                                        </TableCell>
                                        <TableCell>
                                            {data.email}
                                        </TableCell>
                                        <TableCell>
                                            <MoreHorizIcon style={{cursor:'pointer'}}  onClick={handleClick('bottom-end')}/>
                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                      </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal
              open={open}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
            >
              <AddUserDatails in={open} handleClose={handleClose}/>
            </Modal>
            <Popper open={pop} anchorEl={anchorEl} placement={placement} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={{padding:'10px 15px'}}>
                      <p style={{margin:'5px 0',cursor:'pointer'}} onClick={handleOpenEdit}><EditIcon  style={{fontSize:'17px',margin:'0 5px 2px 5px',color:'grey'}}/><span>Edit User Details</span></p>
                      <p style={{margin:'5px 0',cursor:'pointer'}}><DeleteIcon style={{fontSize:'17px',margin:'0 5px 2px 5px',color:'red'}}/><span>Delete User</span></p>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <Modal
              open={openEdit}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
              onClose={handleCloseEdit}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
            >
              <EditUserDatails in={open} handleClose={handleCloseEdit}/>
            </Modal>
            
        </>
    )
}

export default HomePage