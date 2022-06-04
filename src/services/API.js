import axios from "axios";

export default () => {
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ"
    const instan = axios.create();

    instan.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    instan.interceptors.response.use(
        (response) => {
            if (response.status == 200) {
                return response;
            }
        },
        (error) => {
            if (error.response.status == 401) {
                console.log("DENIED");
            }
            return Promise.reject(error);
        }
    );

    return instan;
};