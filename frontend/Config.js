const ServerConfig =
{
    api: {
        protocol: "http", // http or https
        hostname: "0.0.0.0", // xxx.xxx.xxx.xxx or www.example.domain.com
        port    : "5000", // 80 || 5000

        passwordManager: {
            name    : "pwdmanager", // Controller for password manager
            routes: {
                getAll: "get-all", // Get All Accounts Page 
                getOne: "account", // Get One Accounts Page
                create: "create",  // Create  Account  Page
                update: "update",  // Update  Account  Page
                delete: "delete"   // Delete  Account  Page
            }
        }
    }
}

export default class Config {
    /**
     *  Creating Link for Password manager api constructor
     *  */
    static pwdManagerBackendLink = `${ServerConfig.api.protocol}://${ServerConfig.api.hostname}:${ServerConfig.api.port}/${ServerConfig.api.passwordManager.name}/`;
    /*
    * Creating Links to other pages of api
    * */
    static GetAllAccountsLink() {
        // GET ALL ACCOUNTS
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.getAll + '/';
    }
    static GetOneAccountLink() {
        // GET ONE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.getOne + '/';
    }
    static CreateAccountLink() {
        // CREATE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.create + '/';
    }
    static UpdateAccountLink() {
        // UPDATE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.update + '/';
    }
    static DeleteAccountLink() {
        // DELETE ACCOUNT
        return this.pwdManagerBackendLink + ServerConfig.api.passwordManager.routes.delete + '/';
    }
}
