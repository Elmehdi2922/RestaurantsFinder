export class AuthService {

    isAuth = false;

    signIn(login: String, password: String) {
        return new Promise(
            (resolve, reject) => {
                if (login == "admin" && password == "admin") {
                    this.isAuth = true;
                    resolve(true);
                }else{
                    alert("Error login and password !");
                }
            }
        );
    }

    signOut() {
        this.isAuth = false;
    }
}