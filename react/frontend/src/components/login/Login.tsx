import { FC } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from "@material-ui/core";
import { AuthApi } from "../../api/auth/AuthApi";

type LoginProps = {}

const authenticate = () => {
    AuthApi.authenticate()
}

const Login: FC<LoginProps> = () => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<GitHubIcon />}
            onClick={authenticate}
        >
            Login with GitHub
        </Button>
    )
}

export default Login;