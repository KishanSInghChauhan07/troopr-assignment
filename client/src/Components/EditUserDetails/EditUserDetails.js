import React,{useState} from 'react';
import {TextField,Card,Button} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number'
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const EditUserDatails = ({handleClose,data}) =>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory(); 

    console.log(data);
    
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            swal("Invalid Email", {
                button: false,
                timer:"2000"
            });
            return
        }
        // const data = new FormData()
        // data.append("file",url)
        // data.append("upload_preset","leewayhertz")
        // data.append("cloud_name","kishansinghchauhan")
        // fetch("https://api.cloudinary.com/v1_1/kishansinghchauhan/image/upload",{
        //     method:"post",
        //     body:data
        // })
        // .then(res => res.json()) 
        // .then(data => {
        //     setUrl(data.url)
        // }).catch(err => {
        //     console.log(err)
        // })
        
            
        fetch('/user/'+data.id,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                address,
                image:url
            })
        }).then( res => res.json())
            .then( data => {
                if(data.error){
                    swal(data.error, {
                        button: false,
                        timer:"2000"
                    });
                }
                else{
                    swal(data.message, {
                        button: false,
                        timer:"2000",
                    });
                    history.push('/Users');
                }
            }).catch(err =>{
                console.log(err);    
            })
    }
    return(
        <Card className='' style={{margin:'6% auto',padding:'50px 50px',boxShadow:'1px 1px 5px 5px lightgrey',width:'40%'}}>
            <div className='d-flex'>
            <h5 style={{margin:'10px 0 40px 0',fontWeight:'600'}}>Edit User</h5>
            <CloseIcon style={{marginLeft:'auto',position:"relative", top:'13px',right:'4px',cursor:'pointer'}} onClick={handleClose}/>
            </div>
            
            <form className="" noValidate autoComplete="off">
            <div className="d-flex">
            <Card className="d-flex flex-column" style={{width:'250px',border:'1px solid grey' }}>
                {!url ? (
                    <AccountCircleIcon style={{height:"120px",width:'120px',margin:'10px auto'}}/>
                    ) : (
                    <DoneIcon style={{height:"90px",width:'90px',margin:'10px auto',border:'1px solid #28a745',borderRadius:'50%',padding:'20px',background:'#28a745',color:'#FFFFFF'}} />
                )}
                <Button
                  variant="contained"
                  component="label"
                  style={{width:'80%',margin:'0 auto 20px auto'}}
                >
                  Upload
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setUrl(e.target.files[0])}
                    
                  />
                </Button>
                </Card>
               <div className="d-flex flex-column ml-5" style={{width:'100%'}}>
               <TextField 
                    label="Name"
                    className="mt-3 mb-2" variant="outlined" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField 
                    label="Address" 
                    className="mt-4" variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}    
                />
               </div>
                
            </div>
                <div className="d-flex mt-5">
                <MuiPhoneNumber defaultCountry={'in'} onChange={(phone) => setPhone(phone)} value={phone} style={{margin:"20px 10px 0 0", width:"50%"}} />
                <TextField 
                    label="Email"  
                    variant="outlined" 
                    style={{margin:"0 0 0 10px", width:"50%"}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />  
                </div>
                               
              
            </form>
            <Button variant="contained" color="primary" style={{color:'#FFFFFF',padding:'10px 15px',margin:'40px 0 0 0',width:'100%'}} 
                onClick={() => PostData()}
            >
              Save Changes
            </Button>
           
        </Card>
    )
}

export default EditUserDatails;