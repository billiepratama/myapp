import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {
    render(){
    return (
        <div>
            <AppBar position="static" style={{ background: '#000000' }}>
                <Toolbar>
                    <Button edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </Button>
                    <h3 style={{flexGrow:1}}>
                        PTBC Customer Database
                    </h3>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
}
export default NavBar;