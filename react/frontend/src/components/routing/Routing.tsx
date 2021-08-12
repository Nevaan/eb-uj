import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PublicRoutes, SecuredRoutes } from "../../config/routes";
import { useAuthState } from "../../context/auth/context";
import Drawer from "../Drawer";


type RoutingProps = {}

const Routing: FC<RoutingProps> = () => {

    const { loggedIn } = useAuthState();

    return (
        <div>
            {loggedIn && <Drawer/>}
            <Switch>
                {loggedIn ?
                    (
                        SecuredRoutes.map(route => (
                            <Route key={route.path} exact={route.exact} path={route.path} component={route.component} ></Route>
                        )).concat(
                            <Redirect to='/' />
                        )

                    ) :
                    (

                        PublicRoutes.map(route => (
                            <Route key={route.path} exact={route.exact} path={route.path} component={route.component} ></Route>
                        ))
                            .concat(
                                <Redirect exact to='/login' />
                            )

                    )}
            </Switch>
        </div>
    )
}

export default Routing;