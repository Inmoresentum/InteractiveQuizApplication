import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options = {
// Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const {username, password} = credentials;
                try {
                    const res = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
                        email: username,
                        password: password,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    // Process the response here
                    console.log(res.data);
                    const user = await res.data;
                    if (user) {
                        return user;
                    }
                } catch (error) {
                    // Handle error here
                    console.error(error);
                    console.error(error.data());
                    return null;
                }
                console.log("probably okay?")
                // console.log(JSON.stringify({
                //     email: username,
                //     password,
                // }),)
                // console.log("hehe here")
            },
        }),
    ],

    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;

            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },
}