import { Button } from 'antd';
import './App.css';

import apiClient from "./api";

async function App() {
    try {
        const response = await apiClient.get("/students");

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="App">
            <Button size="large" type="primary">Hello</Button>
        </div>
    );
}

export default App;
