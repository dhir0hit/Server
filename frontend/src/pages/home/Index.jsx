import { useNavigate } from "react-router-dom";

const Index = (props) => {
    const navigate = useNavigate();

    return <button onClick={() => navigate(-1)} >go back</button>
}

export default Index;