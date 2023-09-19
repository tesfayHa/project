import Home from "./branch/pages/home/Home";
import Login from "./branch/pages/login/Login";
import List from "./branch/pages/User List/UserList";
import Single from "./branch/pages/User List/userDetail";
import New from "./branch/pages/User List/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { AuthContext } from "./branch/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DarkModeContext } from "./branch/context/darkModeContext";
import Accounts from "./branch/pages/accounts/Accounts";
import CustomersList from "./branch/pages/customers/CustomerList";
import NewCustomer from "./branch/pages/customers/NewCustomer";
import { NoMatch } from "./branch/pages/NoMatch/NoMatch";
import CustomerDetail from "./branch/pages/customers/CustomerDetail";
import MerchantList from "./branch/pages/marchants/MerchantsList";
import NewMerchant from "./branch/pages/marchants/NewMerchant";
import BusinessList from "./branch/pages/business/BusinessList";
import NewBusiness from "./branch/pages/business/NewBusiness";
import BusinessDetail from "./branch/pages/business/BusinessDetail";
import AgentsList from "./branch/pages/Agents/AgentsList";
import NewAgent from "./branch/pages/Agents/NewAgent";
import MyProfile from "./branch/pages/profile/Myprofile";
import Operation from "./branch/pages/Operations/Operations";
import MyAccount from "./branch/pages/MyAccount/MyAccount";
import OutletsList from "./branch/pages/Outlets/OutletsList";
import OutletDetail from "./branch/pages/Outlets/OutletsDetail";
import NewOutlets from "./branch/pages/Outlets/NewOutlets";
import ActivityLogs from "./components/Actions/ActivityLogs";
import ChangeStatus from "./components/Actions/ChangeStatus";
import Operators from "./components/Actions/Operators";
import SpecificTransactionDetail from "./components/Actions/SpecificTransactionDetail";
import SpecificTransactions from "./components/Actions/SpecificTransactions";
import Statement from "./Reports/Statement";
import StatementDetail from "./Reports/StatementDetail";
import SpecificStatement from "./components/Actions/SpecificStatement";
import Reconciliation from "./Reports/Reconciliation";
import Summary from "./Reports/Summary";
import Activate from "./settings/Activate";
import ChangeLanguage from "./settings/ChangeLanguage";
import ChangePassword from "./settings/ChangePassword";
import ChangePIN from "./settings/ChangePin";
import SpecificReconciliation from "./components/Actions/SpecificReconciliation";
import SpecificSummary from "./components/Actions/SpecificSummary";
import TransferDetail from "./branch/pages/Transfers/TransferDetail";
import TransferList from "./branch/pages/Transfers/TransferList";
import TransactionsList from "./branch/pages/Transactions/TransactionsList";
import TransactionDetail from "./branch/pages/Transactions/TransactionDetail";
import AuthorizeTransactions from "./branch/pages/Transactions/AuthorizeTransactions";
import SpecificCommissions from "./components/Actions/SpecificCommissions";
import SearchedResult from "./components/SearchedResult/SearchedResults"

function App() {
    const { darkMode } = useContext(DarkModeContext);
    const { token, profile, group, status, pin_reset_required, password_reset_required } = useContext(AuthContext);
    const RequireAuth = ({ children }) => { return token ? children : <Navigate to = "/"/>  };
    console.log(token);
    return ( <div className = { darkMode ? "app dark" : "app" }>
        <BrowserRouter>
            <Routes> 
                {token && group === "CUS" && <Route index element = { <Login /> }/>}
                {token && (status === "CREATED" || status === "Created") && ( <Route path = "*" element = { <Activate /> }/>)}
                {token && password_reset_required && ( <Route path = "*"element = { <ChangePassword /> }/>)}
                {token && pin_reset_required && ( <Route path = "*"element = { <ChangePIN /> }/>)}
                
                <Route path = "/">
                <Route index element = { <Login /> }/>

                {!pin_reset_required &&!password_reset_required && status !== "CREATED" &&status !== "Created" && 
                ( <Route>
                    <Route path = "/branch" >
                            <Route index element = { <RequireAuth><Home /></RequireAuth> }/> 
                            <Route path = "users" >
                                <Route index element = { <RequireAuth> <List /> </RequireAuth>}/> 
                                <Route path = ":userId" element = { <RequireAuth ><Single /> </RequireAuth> }/> 
                                <Route path = "new" element = { <RequireAuth> <New title = "Add New User" /> </RequireAuth> }/> 
                            </Route> 
                            <Route path = "accounts"> <Route index element = { <RequireAuth><Accounts /></RequireAuth>}/> </Route> 
                            {(group === "BRA" || group === "AGE") && ( <Route path = "customers">
                                    <Route index element = { <RequireAuth> <CustomersList /> </RequireAuth>}/> 
                                    <Route path = "customerDetail" element = { <RequireAuth><CustomerDetail /></RequireAuth>}/> 
                                    <Route path = "newCustomer" element = { <RequireAuth ><NewCustomer title = "Add New Customer" />
                                    </RequireAuth>}/> </Route>) } 

                           {group === "AGE" && profile === "Master Agent"  &&( <>
                                <Route path = "agents" >
                                    <Route index element = { <RequireAuth> <AgentsList /> </RequireAuth>}/> 
                                    <Route path = "newAgent" element = { <RequireAuth> <NewAgent title = "Add New Agent" />
                                        </RequireAuth> } /> </Route>  
                                <Route path = "merchants" >
                                        <Route index element = { <RequireAuth><MerchantList/></RequireAuth> }/> 
                                        <Route path = "newMerchant" element = { <RequireAuth> <NewMerchant title = "Add New merchant"/>
                                    </RequireAuth> }/> </Route> 
                                    </>
                                        )        
                                        } 

                            {group === "AGE" && ( <Route path = "outlets">
                                    <Route index element = { <RequireAuth> <OutletsList /> </RequireAuth>}/> 
                                    <Route path = "outletsDetail" element = { <RequireAuth> <OutletDetail /> </RequireAuth> } /> 
                                    <Route path = "newOutlets" element = { <RequireAuth> <NewOutlets title = "Add New Outlet" />
                                        </RequireAuth> }/> </Route> ) } 
                            { group === "BRA" && ( <> 
                                    <Route path = "merchants" >
                                        <Route index element = { <RequireAuth><MerchantList/></RequireAuth> }/> 
                                        <Route path = "newMerchant" element = { <RequireAuth> <NewMerchant title = "Add New merchant"/>
                                            </RequireAuth> }/> </Route> 
                                    <Route path = "businesses" >
                                        <Route index element = { <RequireAuth ><BusinessList /> </RequireAuth>}/> 
                                        <Route path = "businessDetail"element = { <RequireAuth><BusinessDetail /> </RequireAuth> }/> 
                                        <Route path = "newBusiness" element = { <RequireAuth><NewBusiness title = "Add New Business" /> </RequireAuth> }/> 
                                    </Route> 
                                    <Route path = "agents">
                                        <Route index element = { <RequireAuth ><AgentsList /></RequireAuth>}/> 
                                        <Route path = "newAgent" element = { <RequireAuth> <NewAgent title = "Add New Agent" /> </RequireAuth>}/> 
                                    </Route> 
                                    </> ) }
                            <Route path = "transfers">
                                <Route index element = { <RequireAuth ><TransferList /></RequireAuth> }/> 
                                <Route path = "transferDetail" element = { <RequireAuth ><TransferDetail /></RequireAuth> } /> 
                            </Route> 
                            <Route path = "transactions">
                                <Route index element = { <RequireAuth ><TransactionsList /></RequireAuth>} /> 
                                <Route path = "authorizeTransactions" element = { <RequireAuth> <AuthorizeTransactions /></RequireAuth>}/> 
                                <Route path = "transactionDetail" element = { <RequireAuth><TransactionDetail /> </RequireAuth>}/> 
                            </Route>
                            <Route path = "operations" element = { <RequireAuth> <Operation /></RequireAuth>}/>
                            </Route> 
                            <Route path = "myProfile" element = { <RequireAuth> <MyProfile /> </RequireAuth> }/> 
                            <Route path = "myAccount" element = { <RequireAuth> <MyAccount /></RequireAuth> }/> 
                            <Route path = "activity_log" element = { <RequireAuth> <ActivityLogs /> </RequireAuth> }/> 
                            <Route path = "change_status" element = { <RequireAuth><ChangeStatus /></RequireAuth> }/>
                            <Route path = "operators" element = { <RequireAuth><Operators /></RequireAuth> }/> 
                            <Route path = "transfers" element = { <RequireAuth> <SpecificTransactions /> </RequireAuth> }/> 
                            <Route path = "specificTransactionDetail" element = { <RequireAuth> <SpecificTransactionDetail /></RequireAuth>}/>
                            <Route path = "statement">
                                <Route index element = { <RequireAuth> <Statement /> </RequireAuth> }/> 
                                <Route path = "statementDetail" element = { <RequireAuth> <StatementDetail /> </RequireAuth>}/>
                            </Route>
                            <Route path = "reconciliation" element = { <RequireAuth> <Reconciliation /> </RequireAuth>}/> 
                            <Route path = "specificReconciliation" element = { <RequireAuth> <SpecificReconciliation /></RequireAuth>}/> 
                            <Route path = "specificStatement" element = { <RequireAuth> <SpecificStatement /> </RequireAuth> }/> 
                            <Route path = "specificCommissions"element = { <RequireAuth> <SpecificCommissions /></RequireAuth> }/> 
                            <Route path = "summary" element = { <RequireAuth> <Summary /> </RequireAuth> }/>
                            <Route path = "activate" element = { <RequireAuth> <Activate /> </RequireAuth> }/> 
                            <Route path = "searchedResult" element = { <RequireAuth> <SearchedResult /> </RequireAuth>}/> 
                            <Route path = "settings/changeLanguages" element = { <RequireAuth> <ChangeLanguage /> </RequireAuth> }/> 
                            <Route path = "settings/changePassword" element = { <RequireAuth><ChangePassword /></RequireAuth> } /> 
                            <Route path = "settings/changePin" element = { <RequireAuth> <ChangePIN /> </RequireAuth>}/>
                            <Route path = "specificSummary" element = { <RequireAuth> <SpecificSummary /></RequireAuth> }/> </Route>
                        )} 
                    </Route>
                    {token && <Route path = "*" element = { <NoMatch /> }/>} 
                    <Route path = "*" element = { <Login /> }/> 
            </Routes> 
          </BrowserRouter> 
        </div>
        )}
    export default App;