// Impoting built-in components
import { useParams, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from 'react';

// Importing third party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Importing Components
import { PManagerNavigation } from '../../components/Navigation'; // Navigation for pwdmanager
import Icons from '../../components/Icons'; // Icons 
import Alert from "../../components/Alert"; // Alert BOX

// Importing utils
import {default as CalcStrength} from "../../utils/PasswordStrength";


const Detail = (props) => {
    let { id } = useParams();
    const Data = props.service.get_account(id);
    
    console.log(Data.createdOn);
    let CreationDate = new Date(Data.createdOn);
    let EditDate = new Date(Data.editedOn);

    /**
     * It does not update on any change
     */
    CreationDate = `${CreationDate.getDate()}-${CreationDate.getMonth()+1}-${CreationDate.getFullYear()}`;
    EditDate = `${EditDate.getDate()}-${EditDate.getMonth()+1}-${EditDate.getFullYear()}`;


    const [Edit, setEdit] = useState(false);
    const [hideAlert, sethideAlert] = useState(true);
    
    const [Platform, setPlatform] = useState(Data.platform);
    const [Username, setUsername] = useState(Data.username);
    const [Password, setPassword] = useState(Data.password);
    const [Website, setWebsite] = useState(Data.website);
    const [AdditionalInfo, setAdditionalInfo] = useState(Data.additionalInfo);
    const [Favorite, setFavorite] = useState(Data.favorite);
    // console.log(Favorite);
    
    const [PasswordStrength, setPasswordStrength] = useState(0);
    const [PasswordStrengthProgressColor, setPasswordStrengthProgressColor] = useState('#ff0000');

    const navigate = useNavigate();

    useEffect(() => {
        UpdateAccount();
    }, [Favorite])

    useEffect(() => {
        setPasswordStrength(()=>{
            try {
                let calcStrength = new CalcStrength(Password);
                setPasswordStrengthProgressColor(()=>{        
                    if (calcStrength.StrengthPercentage <= 0) {
                        return "rgba(255, 0, 0, 0.7)";
                    } else if (calcStrength.StrengthPercentage <= 40) {
                        return "rgba(255, 141, 0, 0.7)";
                    } else if (calcStrength.StrengthPercentage <= 70) {
                        return "rgba(215, 255, 0, 0.7)";
                    }
                    return"rgba(51, 255, 0, 0.7)";
                })
                return calcStrength.StrengthPercentage;
            } catch (e) {
                console.log(e)
                return 0;
            }
        })
    }, [Password])

    /**
     * Deleting Account from database
     */
    const DeleteAccount = () => {
        // Delete Account from Database
        props.service.DeleteAccount(id);

        // Goinf back a page from history
        navigate(-1);
    }
    const UpdateAccount = () => {
        console.log(Favorite)
        // upadate on database
        if (Username == Data.username &&
            Password == Data.password &&
            Platform == Data.platform &&
            Website  == Data.website  &&
            AdditionalInfo == Data.additionalInfo &&
            Favorite == Data.favorite)
            {return 0} 
            
        props.service.UpdateAccount(
            id, 
            Username,
            Password, 
            Platform,
            Website,
            AdditionalInfo, 
            Favorite, 
            Data.createdOn
        )
        console.log("DATAUPDATE");
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
    {/* Navigation for Password Manager */}
    <PManagerNavigation />
    
    {/* Main Body */}
    <Suspense>
        <div className={'pwdmanager detail'}>
            <div className="uppercontainer">
                <div>
                    <Icons name={Platform} />
                    <div>
                        {
                            Edit ? 
                            <input
                                type="text"
                                defaultValue={Platform}
                                onChange={(e)=>{
                                    setPlatform(() => e.target.value)
                                }}
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
                            setFavorite(currentValue => {
                                return !currentValue
                            });
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
                    style={{width: `${PasswordStrength}%`, background: PasswordStrengthProgressColor}}
                    ></div>
                <div>
                    <h3>Username</h3>
                    {
                        Edit ?
                        <input 
                            type={"text"}
                            defaultValue={Username} 
                            onChange={(e)=>{setUsername(() => e.target.value)}}
                        /> :
                        <div>
                            <h3>{Username}</h3>
                            <CopyToClipboard text={Username}>
                                <button><Icons name={'copy'} /></button>
                            </CopyToClipboard>
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
                            onChange={(e)=>setPassword(() => e.target.value)}
                        /> :
                        <div>
                            <h3>{Password}</h3>
                            <CopyToClipboard text={Password}>
                                <button><Icons name={'copy'} /></button>
                            </CopyToClipboard>
                        </div>
                    }
                </div>
                <div>
                    <h3>Website</h3>
                    {
                        Edit ?
                        <input
                            id={'website-input'}
                            type={'text'}
                            defaultValue={Website} 
                            onChange={(e)=>setWebsite(() => e.target.value)}
                        /> :
                        <div>
                            <h3><a href={'https://' + Website} target="_blank">{Website}</a></h3>
                            <CopyToClipboard text={Website}>
                                <button><Icons name={'copy'} /></button>
                            </CopyToClipboard>
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
                            onChange={(e)=>setAdditionalInfo(() => e.target.value)}
                        /> :
                        <p>{AdditionalInfo}</p>
                    }
                </div>
                <div 
                    id="passwordstrength"
                    className="progress"
                    style={{width: `${PasswordStrength}%`, background: PasswordStrengthProgressColor}}
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
            }}
            Hide={hideAlert}
            Cancel={(value)=>sethideAlert(value)}
            Ok={()=>DeleteAccount()}
            />
    </Suspense>
    </>;
}

export default Detail;