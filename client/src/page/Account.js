import * as React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import SERVER_DOMAIN from "../constants/server";
import Loading from '../component/Loading'
export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: true
        };
    }

    componentDidMount() {
        axios.get(SERVER_DOMAIN + "/api/availableTimes", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {
                this.setState({
                    data: response.data
                }, () => {
                    this.setState({ isLoading: false })

                })
            })
            ;
    }
    render() {

        const { data, isLoading } = this.state
        console.log(this.props)
        if (isLoading) {
            return <Loading />
        }
        return (
            <Paper>
                Abc
            </Paper>
        );
    }
}   