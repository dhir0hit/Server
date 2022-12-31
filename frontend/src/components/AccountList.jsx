import Icons from './Icons'

const AccountList = (props) => {
    return (
        <div className="account-list">
            {props.data.map(data => (
                    <AccountElement
                        key={data.id}
                        
                        id={data.id}
                        platform={data.platform}
                        username={data.username}
                        favorite={data.favorite}
                    />
                    )
                )
            }
        </div>
    )
}

const AccountElement = (props) => {
    return <a
        href={`pwdmanager/account/${props.id}`}
        className={`account-element ${props.favorite==true? 'favorite' : ''}`}
        >
        <div>
            <Icons name={props.platform} />
            <div>
                <h2>{props.platform}</h2>
                <h4>{props.username}</h4>
            </div>
        </div>
        <Icons name={'star'} />
    </a>;
}

export default AccountList;