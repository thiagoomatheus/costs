import { useContext } from "react";
import { SetUserContext } from "../contexts/Contexts";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { UserType } from "../form/LoginForm";
import useMessage, { Message } from "./useMessage";
import { MessageContext } from "../contexts/MessageContextProvider";

export default function useLogin() {

    const { generateMessage } = useMessage()

    const { setMessage } = useContext(MessageContext)

    const provider = new GoogleAuthProvider();

    const setUid = useContext(SetUserContext)

    const loggedSuccess = (userCredential: any) => {

        const user = userCredential.user;

        setUid(user.uid)

        generateMessage(Message.LoginSuccess, undefined, "success")

    }

    const loggedFailed = (error: any) => {
        const errorCode = error.code;

        const errorMessage = error.message;

        console.log(errorCode + errorMessage);

        generateMessage(undefined, Message.LoginFailed, "error")
    }

    function handleLogin(user: UserType) {

        const auth = getAuth();

        if (user?.email && user.password) {

            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                loggedSuccess(userCredential)

            })
            .catch((error) => {

                loggedFailed(error)

            });

        }

    }

    function handleLoginGoogle() {

        const auth = getAuth();

        signInWithPopup(auth, provider)
        .then((result) => {
            // Signed in
            loggedSuccess(result)

        }).catch((error) => {

            loggedFailed(error)

        });

    }

        function handleRegister(user: UserType) {

        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

        if (!user?.email || !regexEmail.test(user?.email)) { // Validando email

            setMessage({
                message: Message.EmailInvalid,
                type: "error"
            })

            generateMessage()

            return

        } else if (!user.password || !regexPassword.test(user.password)) {

            setMessage({
                message: Message.PasswordInvalid,
                type: "error"
            })

            generateMessage()

            return

        }
        
        const auth = getAuth();

        if (user?.email && user.password) {

            createUserWithEmailAndPassword(auth, user.email, user.password)

            .then((userCredential) => {

                // Signed in 
                loggedSuccess(userCredential)

            })
            .catch((error) => {

                loggedFailed(error)

            });
            }
    }

    return {
        handleLogin,
        handleLoginGoogle,
        handleRegister
    }
}