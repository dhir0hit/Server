import { NavLink, Link } from "react-router-dom";

const Navigation = () => {

    const changeNavigation = () => {
        let windowWidth = window.innerWidth;

        if (windowWidth > 600) {
            trigger_navigation(true);
            navigationButton(false);
        } else {
            trigger_navigation(false);
            navigationButton(true);
        }
    }

    const navigation_trigger_icon = document.querySelector(".navigation.trigger button svg");
    const navigation_container = document.querySelector(".navigation.container");

    let is_navigate = false

    const trigger_navigation = (value = !is_navigate) => {
        is_navigate = value;
        // navigation_trigger_icon.innerHTML = is_navigate ? close_svg : navigation_svg;
        navigation_container.style.display = is_navigate ? "block" : "none";
    }

    // navigation button icon change
    const navigationButton = (value=true) => {
        const Navigation = document.querySelector(".navigation.icon");
        if (Navigation.classList.contains("active") && value) {
            Navigation.classList.remove("active");
        } else {
            Navigation.classList.add("active");
        }
    }




    return (
            <>
            <div className='navigation trigger'>
                <button onClick={trigger_navigation}>
                    <div className='navigation icon' onClick={navigationButton} >
                        <div className='line 2'></div>
                        <div className='line 1'></div>
                        <div className='line 3'></div>
                    </div>
                </button>
            </div>
            <div className='navigation container'>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/pwdmanager">Password Manager</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><a href="http://10.0.0.112:5050/">Code Server</a></li>
                </ul>
        </div>
        <script type='text/javascript'>
            window.onresize = changeNavigation();
        </script>
        </>
    )
}

export const PManagerNavigation = () => {

    return (
            <div className={"pwdmanager navigation"}>
                <ul>
                    <li><NavLink to={"/pwdmanager/create"}>Create</NavLink></li>
                    <li><NavLink to={"/pwdmanager/settings"}>Settings</NavLink></li>
                </ul>
            </div>
            );
}

export default Navigation;