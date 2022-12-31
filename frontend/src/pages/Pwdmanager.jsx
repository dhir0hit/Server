import {BrowserRouter, Routes, Route} from "react-router-dom";

// importing components
import { PManagerNavigation } from '../components/Navigation';

// importing pages
import Create from './pwdmanager/Create';

const Pwdmanager = () => {
    return (
        <>
            <PManagerNavigation />
        </>
    );
}

export default Pwdmanager;
