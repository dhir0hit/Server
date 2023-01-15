// importing components
import { useEffect, useState } from 'react';
import { PManagerNavigation } from '../../components/Navigation';
import AccountList from '../../components/AccountList';



function Index (props) {
    
    const [Data, setData] = useState([]);

    useEffect(() => {
        let accounts = props.service;
        accounts.load_data()
        .then((data)=>setData(data))
// TODO: use Data.length to reduce redundant api calls
    }, [Data])

    return (
        <>
            <PManagerNavigation />
            <AccountList data={Data} />
        </>
    );
}

export default Index;
