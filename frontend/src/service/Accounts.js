
import PasswordStrength from "../utils/PasswordStrength";


export default class Accounts {
    constructor() {
        // All Accounts List
        this.List = []
        this.empty_filters();

        // Loading Data
        this.load_data().then(data => {
            this.List = data;
        })
        // Calculating Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }

    empty_filters() {
        // Favorite Accounts List
        this.favoriteList = []
        // Recently Created Accounts
        this.recentList = []
        // Accounts with weak password
        this.weakList = []
        // Accounts with missing credentials
        this.missingCredentialsList = []

        // Json format
        this.platformList = {}

        this.OverallPasswordStrength = 0
        this.StrongPasswords = 0
        this.NormalPasswords = 0
        this.WeakPasswords = 0

        // Last account id
        this.LastAccountId = 0
    }

    /**
     * Load data from database
     * */
    async load_data() {
        /*
        * TODO: Create Connection with database
        * */
        try {
            const response = await fetch('http://10.0.0.112:5000/pwdmanager/get-all');
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    get_account(id) {
        for (const account of this.List) {
            if (account.id==id) {
                return account;
            }
        }
        return 0;
    }

    /**
     * Add account to database
     * and add in list
     * @param account Account model
     * */
    CreateAccount(username, 
                  password,
                  platform, 
                  website, 
                  additionalInfo, 
                  favorite)
        {

        this.load_data()
        .then(data => this.List = data)
        .then ( () => {

            let current_date = new Date();

            let Id = this.LastAccountId + 1;
            let account = {
                id: Id,
                username: username, 
                password: password,
                platform: website,
                additionalInfo: additionalInfo,
                favorite: favorite,
                createdOn: current_date.toString(),
                editedOn: current_date.toString()
            }
            
            fetch('http://10.0.0.112:5000/pwdmanager/create', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    id: Id,
                    username: username,
                    password: password,
                    platform: platform,
                    website: website,
                    additionalInfo: additionalInfo,
                    favorite: favorite,
                    createdOn: current_date.toString(),
                    editedOn: current_date.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log("Saved")
                    this.List.push(account);
                } else {
                    console.log("NOT Saved")
                }
            })
            // TODO: Add account to database
            // fetch(`http://10.0.0.112:5000/pwdmanager/update?id=${id}&username=dhir0hit&password=rohitkumardhir&platform=google&website=www.google.com&additionalInfo=info for accounts&favorite=0&createdOn=10-12-2002&editedOn=12-12-2020`)
            console.log(account)
        })


        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }

    /**
     * Update Account from database
     * and update from list
     * */
    UpdateAccount(newAccount) {
        this.List.map((account) => {
            return account.id === newAccount.id
                ? newAccount
                : account;
        })
        // TODO: Update Account from database
        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }

    /**
     * Delete Account from database
     * and remove form list
     * */
    DeleteAccount(id) {
        this.List = this.List.filter((account) => {
            return account.id !== id;
        });
        // TODO: Delete account from database
        this.empty_filters();
        // Calculate Strength
        this.CalculateStrength();
        // Filtering Data
        this.FilterData();
    }


    /**
     * Calculating Strength of all the accounts' password
     * */
    CalculateStrength() {
        // looping through accounts list
        for (const account of this.List) {
            // getting password strength of current account
            let passStrength = new PasswordStrength(account.password)
            const _strength = passStrength.StrengthPercentage
            // Adding strength to overall password strength
            this.OverallPasswordStrength += _strength;

            if (_strength < 17) {
                // Weak Password
                this.WeakPasswords++;
                // Adding weak strength password to list
                this.weakList.push(account);
            } else if (_strength < 20) {
                // Normal Password
                this.NormalPasswords++;
            } else {
                // Strong Password
                this.StrongPasswords++;
            }
        }

        // dividing overall Strength by total accounts
        this.OverallPasswordStrength /= this.List.length;
    }

    /**
     * Filtering Data got from database
     * */
    FilterData() {
        console.log("[+] filter data update")
        for (const account of this.List) {
            /*
            * Last account id
            * */
            if (this.LastAccountId < account.id) {
                this.LastAccountId = account.id
            }

            /*
            * Favorite Accounts
            * */
            if (account.favorite) {
                this.favoriteList.push(account);
            }

            /*
            * Recently Created Accounts
            * */
            let accountCreationDate = new Date(account.createdOn);
            accountCreationDate.setDate(accountCreationDate.getDate() + 30)
            const currentDate = new Date();
            if (accountCreationDate.getDate() < currentDate.getDate() &&
                accountCreationDate.getMonth() < currentDate.getMonth() &&
                accountCreationDate.getFullYear() < currentDate.getFullYear()
                ) {
                this.recentList.push(account);
            }

            // Missing Credentials Accounts
            if (account.username === undefined || account.website ===  undefined) {
                this.missingCredentialsList.push(account);
            }

            // Platform list
            if (this.platformList[account.platform] === undefined) {
                // if there is no platform already in list
                this.platformList[account.platform] = []
            }
            // adding item to list with platform filtered
            this.platformList[account.platform].push(account)
            // console.log(account)

        }
        // TODO: not working
    }
}