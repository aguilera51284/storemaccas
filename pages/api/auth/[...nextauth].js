import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import http from '@/lib/http'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // return (
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */

        // using axios is recommended but optional. You can use native fetch() or other libraries.
        try {
          const result = await http
            .post('auth/local', {
              json: {
                identifier:
                  credentials.email /* identifier can be the username, instead of the email */,
                password: credentials.password,
              },
            })
            .json()

          const { user, jwt } = result
          return { jwt, ...user }

          // const { user, jwt } =
          //   (await http
          //     .post(`api/auth/local`, {
          //       json: {
          //         identifier: credentials.email, /* identifier can be the username, instead of the email */
          //         password: credentials.password,
          //       }
          //     })
          //     .then((response) => {
          //       return response.data;
          //     })
          //     .catch((error) => {
          //       console.log(error.response);
          //       throw new Error(error.response.data.message);
          //     })) || null;

          // return { jwt, ...user };
        } catch (error) {
          console.warn('mmmmm', error)
          // Sign In Fail
          // return null;
        }
        // );
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.jwt = user.jwt
        token.username = user.username /* ### */
      }
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.id = token.id
      session.jwt = token.jwt
      session.user.username = token.username /* ### */
      return Promise.resolve(session)
    },
  },
}
export default NextAuth(authOptions)
