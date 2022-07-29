import { useState, useEffect} from "react";
import './App.css';

import apiClient from "./api";

function App() {
    const [ students, setStudents] =  useState([]);

    const fetchStudents = async () => {
        try {
            const response = await apiClient.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="App">
            <p>{students.length}</p>
        </div>
    );
}

export default App;
