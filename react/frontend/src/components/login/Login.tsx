import { FC } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from "@material-ui/core";
import { apiConfig } from "../../api/ApiConfig";

type LoginProps = {}

const authenticate = () => {
    window.location.href = apiConfig.authEntrypoint;
}

const Login: FC<LoginProps> = () => {
    return (
        <div>
            <h1>Scrum tool</h1>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<GitHubIcon />}
                onClick={authenticate}
            >
                Login with GitHub
            </Button>
        </div>
    )
}

export default Login;