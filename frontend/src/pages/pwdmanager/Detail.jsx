import { redirect, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from 'react';
import Icons from '../../components/Icons';
import { PManagerNavigation } from '../../components/Navigation';
import Alert from "../../components/Alert";

const Detail = (props) => {
    let { id } = useParams();
    const Data = props.service.get_account(id);

    let CreationDate = new Date(Data.createdOn);
    let EditDate = new Date(Data.editedOn)

    CreationDate = `${CreationDate.getDate()}-${CreationDate.getMonth()}-${CreationDate.getFullYear()}`;
    EditDate = `${EditDate.getDate()}-${EditDate.getMonth()}-${EditDate.getFullYear()}`;

    const [Edit, setEdit] = useState(false);
    
    const [Platform, setPlatform] = useState(Data.platform);

    const [Username, setUsername] = useState(Data.username);
    const [Password, setPassword] = useState(Data.password);
    const [Website, setWebsite] = useState(Data.website);
    const [AdditionalInfo, setAdditionalInfo] = useState(Data.additionalInfo);

    const [Favorite, setFavorite] = useState(Data.favorite);

    const [hideAlert, sethideAlert] = useState(true);

    const DeleteAccount = () => {
        // Delete Account from Database
    }

    const UpdateAccount = () => {
        // upadate on database
        if (Username == Data.username &&
            Password == Data.password &&
            Platform == Data.platform &&
            Website  == Data.website  &&
            AdditionalInfo == Data.additionalInfo &&
            Favorite == Data.favorite
            )
        {
                return 0
        } 
        console.log("DATAUPDATE")
        return 1;
    }


    async function copyTextToClipboard(value) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(value);
        } 
        return document.execCommand('copy', true, value);
    }

    const handleCopyClick = (value) => {
        copyTextToClipboard(value)
            .then(()=>console.log(value))
    }


    return <>
    <PManagerNavigation />
    <div className={'pwdmanager detail favorite'}>
        <div className="uppercontainer">
            <div>
                <Icons name={Platform} />
                <div>
                    {
                        Edit ? 
                        <input
                            type="text"
                            defaultValue={Platform}
                        /> :
                        <h2>{Platform}</h2>
                    }
                
                    <h4>{Data.id}</h4>
                </div>
            </div>

            <div className={"controls"}>
                <button 
                    className={ Favorite ? 'favorite' : '' }
                    onClick={() => {
                        setFavorite(!Favorite);
                        UpdateAccount();
                    }}
                >
                    <Icons name={'star'} />
                </button>
                <button onClick={() => sethideAlert(false)} >
                    <Icons name={'delete'} />
                </button>
                <button onClick={() => {
                    if (Edit) {
                        let result = UpdateAccount();
                        if (result) {
                            setEdit(!Edit);
                        } else {
                            //TODO: show error
                        }
                    }
                    setEdit(!Edit);
                    }}
                >
                    <Icons name={Edit ? 'close' :'edit'} />
                </button>
            </div>
        </div>

        <div className="midcontainer">
            <div 
                id="passwordstrength"
                className="progress"
                ></div>
            <div>
                <h3>Username</h3>
                {
                    Edit ?
                    <input 
                        type={"text"}
                        defaultValue={Username} 
                        onChange={(e)=>{setUsername(e.target.value)}}
                    /> :
                    <div>
                        <h3>{Username}</h3>
                        <button onClick={()=>handleCopyClick(Username)}>
                            <Icons name={'copy'} />
                        </button>
                    </div>
                }
            </div>
            <div className={'password'}>
                <h3>Password</h3>
                {
                    Edit ?
                    <input 
                        type={"text"}
                        defaultValue={Password} 
                        onChange={(e)=>setPassword(e.target.value)}
                    /> :
                    <div>
                        <h3>{Password}</h3>
                        <button onClick={()=>handleCopyClick(Password)}>
                            <Icons name={'copy'} />
                        </button>
                    </div>
                }
            </div>
            <div>
                <h3>Website</h3>
                {
                    Edit ?
                    <input 
                        type={'text'}
                        defaultValue={Website} 
                        onChange={(e)=>setWebsite(e.target.value)}
                    /> :
                    <div>
                        <h3><a href={'https://' + Website}>{Website}</a></h3>
                        <button onClick={()=>handleCopyClick(Website)}>
                            <Icons name={'copy'} />
                        </button>
                    </div>

                }
            </div>
            <div className="additionalInfo">
                <h3>Additional Info</h3>
                {
                    Edit ?
                    <input 
                        type={'text'}
                        defaultValue={AdditionalInfo} 
                        onChange={(e)=>setAdditionalInfo(e.target.value)}
                    /> :
                    <p>{AdditionalInfo}</p>
                }
            </div>
            <div 
                id="passwordstrength"
                className="progress"
                ></div>
        </div>

        <div className="bottomcontainer">
            <div>
                <h4>Created On</h4>
                <h4>{CreationDate}</h4>
            </div>
            <div>
                <h4>Edited On</h4>
                <h4>{EditDate}</h4>
            </div>
        </div>
    </div>

    <Alert 
        heading={"Alert"}
        text={"Do you want to delete this account?"}
        buttons={{
            0: "Cancel",
            1: "Yes, Delete",
            // 2: "Options"
        }}
        Hide={hideAlert}
        Cancel={(value)=>sethideAlert(value)}
        Ok={DeleteAccount()}
        />
    </>;
}

export default Detail;