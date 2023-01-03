import { useRef }  from "react";

const Alert = (props) => {
    let Buttons;

    let CloseButton = useRef();
    let OkButton = useRef();
    let OptionsButton = useRef();

    let AlertContainer = useRef()

    if (props.buttons === undefined) {
        Buttons = {1 : 'Ok'}
    } else {
        Buttons = props.buttons;
    }



    return (
    <div 
        id={"alert"} 
        style={{display: props.Hide ? 'none' : 'flex'}}
    > 
        <div className={"hover container"}>
            <h1>{props.heading}</h1>
            <p>{props.text}</p>
            <div className={"controls"}>
                {
                    Buttons[0] !== undefined ?
                    <button 
                        className={"danger"}
                        onClick={() => {
                            props.Cancel(true);
                        }}
                    >{Buttons[0]}</button>
                    : ''
                }
                {
                    Buttons[2] !== undefined ?
                    <button 
                        className={"normal"}
                    >{Buttons[2]}</button>
                    : ''
                }
                {
                    Buttons[1] !== undefined ?
                    <button
                        className={"positive"}
                        onClick={()=>{
                            props.Ok();
                            props.Cancel(true);
                        }}
                    >{Buttons[1]}</button>
                    : ''
                }
            </div>
        </div>
    </div>
    );
}

export default Alert;