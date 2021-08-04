import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserApi } from "../../api/user/UserApi";
import { useAuthDispatch } from "../../context/auth/context";

    type LoginCallbackProps = {}

    const LoginCallback: FC<LoginCallbackProps> = () => {
        const history = useHistory();
        const dispatch = useAuthDispatch();

        useEffect(() => {
            fetchProfile()
        }, []);

        const fetchProfile = (): void => {

            UserApi.profile()
            .then(profile => {
                dispatch({ type: 'login', profile });
                history.push("/project")
            })
            .catch((err: Error) => console.log(err))
        }

        return (
            <div>
                LoginCallback!
            </div>
        )
    }

    export default LoginCallback;