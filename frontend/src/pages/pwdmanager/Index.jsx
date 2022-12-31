// importing components
import { useEffect, useState } from 'react';
import { PManagerNavigation } from '../../components/Navigation';
import AccountList from '../../components/AccountList';



function Index (props) {
    
    const [Data, setData] = useState([]);

    useEffect(() => {
        if (Data.length===0) {
        let accounts = props.service;
        accounts.load_data()
        .then((data)=>setData(data))
        }
    })

    return (
        <>
            <PManagerNavigation />
            <AccountList data={Data} />
        </>
    );
}

export default Index;
