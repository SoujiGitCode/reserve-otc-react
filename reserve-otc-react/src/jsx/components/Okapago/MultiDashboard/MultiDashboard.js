import Dashboard from "../Dashboard/Dashboard"
import DashboardTrade from "../DashboardTrades/DashboardTrades"
import {Fragment} from "react"

const MultiDashboard = () =>{

    return(
        <Fragment>
            <Dashboard />

            <div className="my-5">
                <DashboardTrade />
            </div>

        </Fragment>
    )
}

export default MultiDashboard