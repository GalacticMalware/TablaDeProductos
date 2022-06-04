import API from "./API";

export function GetData() {
    return new Promise((response, rej) => {

        API()
            .get("https://eshop-deve.herokuapp.com/api/v2/orders")
            .then((res) => {
                response(res);
            })
            .catch((er) => {
                rej(er);
            });
    });
}