import React from "react";
import axios from "axios";

import {SERVER_HEROKU, GET_USER_INFO, INSERT_USER_INFO} from "../Utils/urls";
import './style.css';

const USERNAME = "usernameSearch";
const NUM1 = "num1";
const NUM2 = "num2";
const NUM3 = "num3";
const NUM4 = "num4";
const NUM5 = "num5";

export default class InfoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameSearch: "",
            infoUser: null,
            message: "",
            isLoading: false,
            callAPI: false,
            num1: 0,
            num2: 0,
            num3: 0,
            num4: 0,
            num5: 0
        };

        this.onChangeUserSearch = this.onChangeInput.bind(this, USERNAME);
        this.onChangenum1 = this.onChangeInput.bind(this, NUM1);
        this.onChangenum2 = this.onChangeInput.bind(this, NUM2);
        this.onChangenum3 = this.onChangeInput.bind(this, NUM3);
        this.onChangenum4 = this.onChangeInput.bind(this, NUM4);
        this.onChangenum5 = this.onChangeInput.bind(this, NUM5);
        this.searchUser = this.searchUser.bind(this);
        this.renderNapThe = this.renderNapThe.bind(this);
        this.onClickInsertNum = this.onClickInsertNum.bind(this);
    }

    onChangeInput(type, e) {
        if(e && e.target && e.target.value) {
            this.setState({
                [type]: e.target.value
            });
        }
    }

    onClickInsertNum() {
        const body = {
            num1: this.state.num1,
            num2: this.state.num2,
            num3: this.state.num3,
            num4: this.state.num4,
            num5: this.state.num5,
            text1: this.state.infoUser.username
        };
        const currentURL = INSERT_USER_INFO;
        axios.post(currentURL, body).then(res => {
            if(res.status === 200) {
                alert("Post data to server success");
            } else {
                alert(res.statusText);
            }
        })
    }

    searchUser() {
        if(this.state.usernameSearch !== "") {
            //URL server
            // let currentURL = SERVER_HEROKU + GET_USER_INFO.replace(`{name}`, this.state.usernameSearch);
            //URL Localhost
            let currentURL = GET_USER_INFO.replace(`{name}`, this.state.usernameSearch);
            this.setState({
                isLoading: true
            }, () => {
                axios.get(currentURL).then(res => {
                    if(res.status === 200) {
                        const data = res.data && res.data.info && res.data.info.length > 0 && res.data.info[0];
                        let infoUser = {};
                        if(data) {
                            infoUser.beri = data.moneyxu || 0;
                            infoUser.ruby = data.moneyluong || 0;
                            infoUser.extol = data.moneyvnd || 0;
                            infoUser.hp = data.hp || 0;
                            infoUser.level = data.level || 0;
                            infoUser.class = data.class || 0;
                            infoUser.bread = data.bread || 0;
                            infoUser.username = this.state.usernameSearch;
        
                            this.setState({infoUser});
                        }
                    } else {
                        alert("Error API");
                    }
                    this.setState({isLoading: false});
                });
            });
        } else {
            alert("Nhap user can search");
        }
        
    }

    renderNapThe() {
        const listTable = [
            {title: "Beri", value: 0, state: this.state.num1,onChange: this.onChangenum1},
            {title: "Ruby", value: 0, state: this.state.num2,onChange: this.onChangenum2},
            {title: "Clan", value: 0, state: this.state.num3,onChange: this.onChangenum3},
            {title: "Extol", value: 0, state: this.state.num4,onChange: this.onChangenum4},
            {title: "Ticker", value: 0, state: this.state.num5,onChange: this.onChangenum5},
        ];
        return (
            <table className="table table-striped table-bordered mt-2">
                <tbody>
                    {listTable.map((itm, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{itm.title}</td>
                                <td>{itm.value}</td>
                                <td className="input-group mp-3 mb-2">
                                    <input className="form-control" type="number" 
                                            value={itm.state} onChange={itm.onChange} />
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td>
                            <button className="btn btn-danger" onClick={this.onClickInsertNum}>
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        const {infoUser, isLoading} = this.state;
        
        return(
            <div className="info-container">
                <div className="user-search">
                    <div className="row">
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-4 text-center mb-2">
                                    <span>Username</span>
                                </div>
                            </div>
                            <div className="input-group mp-3 mb-2">
                                <input className="form-control" placeholder={"Username search"} 
                                    value={this.state.onChangeUserSearch} 
                                    onChange={this.onChangeUserSearch}/>
                            </div>
                            <div className="row">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-4">
                                    <button onClick={this.searchUser} type="button" className="btn btn-primary">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading && (
                        <div className="text-center mt-2">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                    {infoUser && (
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <table className="table table-striped table-bordered mt-2">
                                    <tbody>
                                        <tr>
                                            <td>Beri</td>
                                            <td>{infoUser.beri}</td>
                                        </tr>
                                        <tr>
                                            <td>Ruby</td>
                                            <td>{infoUser.ruby}</td>
                                        </tr>
                                        <tr>
                                            <td>Bánh mỳ</td>
                                            <td>{infoUser.bread}</td>
                                        </tr>
                                        <tr>
                                            <td>HP</td>
                                            <td>{infoUser.hp}</td>
                                        </tr>
                                        <tr>
                                            <td>Extol</td>
                                            <td>{infoUser.extol}</td>
                                        </tr>
                                        <tr>
                                            <td>Level</td>
                                            <td>{infoUser.level}</td>
                                        </tr>
                                        <tr>
                                            <td>Class</td>
                                            <td>{infoUser.class}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {infoUser && (
                        this.renderNapThe()
                    )}
                </div>
            </div>
        );
    }
}