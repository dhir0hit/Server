import { GoogleOutlined,
        InstagramOutlined,
        LinkedinFilled,
        AndroidFilled,
        AppleFilled,
        WindowsFilled,
        ChromeFilled,
        GithubFilled,
        AliwangwangFilled,
        YoutubeFilled,
        FacebookFilled,
        CodepenCircleFilled,
        AmazonCircleFilled,
        DatabaseOutlined,
        IdcardOutlined,
        StarFilled,
        DeleteFilled,
        EditFilled,
        CloseOutlined,
        CopyFilled
} from '@ant-design/icons';

const Icons = (props) => {
    let iconName = '';
    if (props.name !== undefined) {
        iconName = props.name;
    }
    switch (iconName.toLowerCase()) {
        case 'copy':
            return <CopyFilled />;
        case 'close':
            return <CloseOutlined />;
        case 'edit':
            return <EditFilled />;
        case 'delete':
            return <DeleteFilled />;
        case 'star':
            return <StarFilled />;
        case 'google':
            return <GoogleOutlined />;
        case 'instagram':
        case 'insta':
            return <InstagramOutlined />;
        case 'linkedin':
            return <LinkedinFilled />;
        case 'android':
            return <AndroidFilled />;
        case 'apple':
        case 'iphone':
            return <AppleFilled />;
        case 'windows':
        case 'window':
            return <WindowsFilled />;
        case 'chrome':
            return <ChromeFilled />;
        case 'github':
            return <GithubFilled />;
        case 'aliwangwang':
            return <AliwangwangFilled />;
        case 'youtube':
            return <YoutubeFilled />;
        case 'facebook':
            return <FacebookFilled />;
        case 'codepen':
            return <CodepenCircleFilled />;
        case 'amazon':
            return <AmazonCircleFilled />;
        case 'work':
            return <DatabaseOutlined />;
        default:
            return <IdcardOutlined />;
    }
}

export default Icons;