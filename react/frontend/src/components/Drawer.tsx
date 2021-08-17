import {FC, useState, CSSProperties} from "react";

import { Drawer as MaterialDrawer, Divider, IconButton }
    from '@material-ui/core';
import { List, ListItem, ListItemText }
    from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReorderIcon from '@material-ui/icons/Reorder';

type DrawerProps = {}

const styles = {
    sideNav: {
        marginTop: '10px',
        zIndex: 3,
        marginLeft: '0px',
        position: "fixed",
    } as CSSProperties,
    link: {
        color: 'black',
        textDecoration: 'none',
        width: '20vw'
    } as CSSProperties,
    drawer: {
        position: 'absolute',
        top: '10px',
        left: '10px'
    } as CSSProperties
};

const Drawer: FC<DrawerProps> = () => {

    const [isDrawerOpened, setDrawerOpened] = useState<boolean>(false);

    const toggleDrawer = () => setDrawerOpened(!isDrawerOpened)

    return (
        <div style={styles.drawer}>
            <div style={styles.sideNav}>
                <IconButton onClick={toggleDrawer}>
                    {!isDrawerOpened ? <ReorderIcon /> : null }
                </IconButton>
            </div>
            <Divider/>
            <MaterialDrawer
                variant="temporary"
                open={isDrawerOpened}
                onClose={toggleDrawer}
            >
                <Link to='/project' style={styles.link}>
                    <List>
                        <ListItem onClick={toggleDrawer} button key='Projects'>
                            <ListItemText primary='Projects' />
                        </ListItem>
                    </List>
                </Link>
                <Link to='/team' style={styles.link}>
                    <List>
                        <ListItem onClick={toggleDrawer} button key='Teams'>
                            <ListItemText primary='Teams' />
                        </ListItem>
                    </List>
                </Link>
                <Link to='/employee' style={styles.link}>
                    <List>
                        <ListItem onClick={toggleDrawer} button key='Employees'>
                            <ListItemText primary='Employees' />
                        </ListItem>
                    </List>
                </Link>
            </MaterialDrawer>
        </div>
    )
}

export default Drawer;
