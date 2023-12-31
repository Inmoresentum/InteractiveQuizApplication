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
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "mail@mail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const {email, password} = credentials;
                try {
                    const response = await axios.post(
                        "http://localhost:8080/api/v1/auth/authenticate",
                        {
                            email,
                            password,
                        }
                    );

                    console.log(`I will write the response \n ${response.status}`)
                    if (response.status === 200) {
                        // Successful authentication

                        // Retrieve or create the user in your database based on the response data
                        const user = await response.data

                        console.log(user);
                        // Return the user object
                        return user;
                    }

                } catch (error) {
                    // Handle errors
                    console.error("Error during authentication:", error.response.data.message);
                    // Throw an error to indicate the authentication failure
                    // throw new Error(JSON.stringify(error.response.data.message))
                    throw new Error(JSON.stringify(error.response.data.message));
                }
            },
        }),
    ],

    callbacks: {
        async jwt({token, user, trigger, session}) {
            if (trigger === "update") {
                return {...token, ...session.user};
            }
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