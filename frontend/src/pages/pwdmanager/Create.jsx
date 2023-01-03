// importing inbuilt components
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// importing components
import { PManagerNavigation } from '../../components/Navigation';

// importing validations
import { UsernameValidation, 
    PasswordValidation, 
    PlatformValidation } from "../../utils/validations"

/*

show loading in button when pressed add account

*/


function Create (props) {
    const [VisiblityIcon, setVisibleIcon] = useState('visibility');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [platform, setPlatform] = useState('');
    const [website, setWebsite] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [favorite, setFavorite] = useState(false);

    const [usernameValid, setUsernameValid] = useState(0);
    const [passwordValid, setPasswordValid] = useState(0);
    const [platformValid, setPlatformValid] = useState(0);
    
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const [Error, setError] = useState('');
    
    const navigate = useNavigate();

    // use validations here
    const validate = () => {
        setUsernameValid(UsernameValidation(username));
        setPlatformValid(PlatformValidation(platform));

        if (PasswordValidation(password)) {
            setPasswordValid(1);
            setPasswordStrength(PasswordValidation(password));
        } else {
            setPasswordValid(0);
        }
    }

    const displayStrength = () => {
        if (passwordStrength <= 0) {
            return "rgba(255, 0, 0, 0.2)";
        } else if (passwordStrength < 40) {
            return "rgba(255, 141, 0, 0.2)";
        } else if (passwordStrength < 70) {
            return "rgba(215, 255, 0, 0.2)";
        }
        return"rgba(51, 255, 0, 0.2)";
    }

    const autofill = () => {
        if (website && !platformValid) {
            let value = website;

            // spliting full domain name
            // and assigning full domain name to variable
            value = value.split('/')[0];

            // spliting the full domain name
            value = value.split('.');
            // assigning the domain name to variable
            value = (value[value.length -  2]);

            // if domain name is not undefined
            // then setting it to platform
            if (value !== undefined) {
                setPlatform(value);
            }
        }
    }

    const Submit = () => {
        props.service.CreateAccount(
            username,
            password,
            platform,
            website, 
            additionalInfo, 
            favorite
        )
        // Going back a page from history
        navigate(-1)
    }

    return (
            <>
            <PManagerNavigation />

            <main className='pwdmanager create'>
                <aside>
                    <h1 style={{paddingInline: '1rem'}}>Info</h1>

                    <ul>
                        <li>Website and Additional info are Optional fields and can be left empty, </li>
                        <li>Favorite is default false and can left unchanged.</li>
                        <li>Below are requirements</li>
                        <li>Password Strength shown Below</li>
                        <li><strong>Fill Website it will autofill Platform</strong></li>
                    </ul>

                    <div id='username_info'>
                        <h4>Username</h4>
                        <p
                            className='invalid'
                            style={{background: usernameValid ? 'rgba(51, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)' }}
                        >
                        <span>{usernameValid ? 'Valid' :'Not' + String.fromCharCode(160) + 'Valid'}</span>
                    </p>
                </div>

                <div id='password_info'>
                    <h4>Password</h4>
                    <p
                        className='invalid'
                        style={{width: passwordStrength + '%', background: displayStrength()}}
                    >
                        <span>{passwordValid ? 'Valid' :'Not' + String.fromCharCode(160) + 'Valid'}</span>
                    </p>
                </div>

                <div id='platform_info'>
                    <h4>Platform</h4>
                    <p
                        className='invalid'
                        style={{background: platformValid ? 'rgba(51, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)' }}
                    >
                        <span>{platformValid ? 'Valid' :'Not' + String.fromCharCode(160) + 'Valid'}</span>
                    </p>
                </div>

            </aside>


            <form method='post' >
                <label id='username'>
                    Username
                    <input
                        name='username'
                        type='text'
                        onChange={(e) => {
                            setUsername(e.target.value);
                            validate();
                        }}
                    />
                </label>

                <label id='password'>
                    Password
                    <div>
                        <input onChange={(e)=>{
                                setPassword(e.target.value);
                                validate();
                            }}
                            defaultValue={password}
                            style={{display: VisiblityIcon === 'visibility_off' ? 'block' : 'none'}}
                            type='text'

                        />
                        <input
                            onChange={(e)=>{
                                setPassword(e.target.value);
                                validate();
                            }}
                            defaultValue={password}
                            style={{display: VisiblityIcon === 'visibility' ? 'block' : 'none'}}
                            name='password'
                            type='password'
                        />
                        <button
                            type='button'
                            onClick={() => {
                                setVisibleIcon(VisiblityIcon === 'visibility'
                                                                    ?  'visibility_off'
                                                                    : 'visibility')
                            }}>
                            <span className='material-symbols-rounded'>{VisiblityIcon}</span>
                        </button>
                    </div>
                </label>

                <label id='platform'>
                    Platform
                    <input
                        name='platform'
                        type='text'
                        onChange={(e) => {
                            setPlatform(e.target.value);
                            validate();
                        }}
                        defaultValue={platform}
                    />
                </label>

                <label id='website'>
                    Website
                    <div>
                    <span>https://</span>
                    <input
                        name='website'
                        type='text'
                        placeholder='(Optional)'
                        onChange={(e) => {
                            setWebsite(e.target.value);
                            autofill();
                        }}
                    />
                    </div>
                </label>

                <label id='additionalInfo'>
                    Additional Info
                    <input
                        name='additional_info'
                        type='text'
                        placeholder='(Optional)'
                        onChange={(e)=>{
                            setAdditionalInfo(e.target.value);
                        }}
                    />
                </label>

                <label id='favorite'>
                    Favorite
                    <input
                        style={{display: 'none'}}
                        name='favorite'
                        type='checkbox'
                        onChange={()=>{setFavorite(!favorite)}}
                    />
                    <span className='material-symbols-rounded'>star</span>
                </label>

                <button type='button' onClick={Submit}>Submit</button>
            </form>
        </main>
        </>
        );

}


export default Create;
