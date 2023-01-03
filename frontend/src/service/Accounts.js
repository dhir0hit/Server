
import PasswordStrength from "../utils/PasswordStrength";
import Config from "../../Config";

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
            const response = await fetch(Config.GetAllAccountsLink());
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
            
            fetch(Config.CreateAccountLink(), {
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
                    // Updating Locally
                    this.List.push(account);
                    console.log("Saved");
                    return 1;
                }
                console.log("NOT Saved");
                return 0;
            })
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
    UpdateAccount(Id,
                  username, 
                  password,
                  platform, 
                  website, 
                  additionalInfo, 
                  favorite, 
                  createdOn) {
        this.load_data()
        .then(data => this.List = data)
        .then (() => {
            let current_date = new Date();
            let newAccount = {
                id: Id,
                username: username, 
                password: password,
                platform: website,
                additionalInfo: additionalInfo,
                favorite: favorite,
                createdOn: createdOn,
                editedOn: current_date.toString()
            }
            
            fetch(Config.UpdateAccountLink(), {
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
                    createdOn: createdOn,
                    editedOn: current_date.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Updating Locally
                    this.List.map((account) => {
                        return account.id === newAccount.id
                        ? newAccount
                        : account;
                    })
                    console.log("Updated")
                } else {
                    console.log("NOT Updated")
                }
            })
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
        this.load_data()
        .then(data=>this.List = data)
        .then(() => {
            fetch(Config.DeleteAccountLink(), {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    id: id
                }), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Updating data Locally

                    this.List = this.List.filter((account) => {
                        return account.id !== id;
                    });
                    console.log('Deleted');
                } else {
                    console.log('Not Deleted');
                }
            })
        })

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