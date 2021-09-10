import { FC } from "react";
import { useAuthState } from "../../context/auth/context";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

    type ProfileProps = {}

    const useStyles = makeStyles({
        container: {
            display: 'flex',
            marginTop: '20px',
            marginRight: '30px'
        },
        avatar: {
            alignSelf: 'center'
        },
        name: { 
            alignSelf: 'center',
            height: '40px',
            lineHeight: '40px',
            fontWeight: 'bold',
            fontSize: '25px',
            marginLeft: '20px'
        }
    });

    const Profile: FC<ProfileProps> = () => {

        const state = useAuthState();
        const classes = useStyles();

        return (
            <div className={classes.container}>
                {
                    (state.profile && state.profile.avatarURL)?
                    <Avatar className={classes.avatar} src={state.profile.avatarURL}/>
                    :
                    <div></div>
                }
                {
                    (state.profile && state.profile.fullName)?
                    <div className={classes.name}>{ state.profile.fullName }</div> :
                    <div></div>
                }

            </div>
        )
    }

    export default Profile;