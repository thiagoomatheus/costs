import { useContext } from "react";
import { SetMessageContext, SetUserContext } from "../contexts/Contexts";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { UserType } from "../form/LoginForm";
import useMessage, { Message } from "./useMessage";

export default function useLogin() {

    const { generateMessage } = useMessage()
    const setMessage = useContext(SetMessageContext)
    const provider = new GoogleAuthProvider();

    const setUid = useContext(SetUserContext)

    function handleLogin(user: UserType) {
        const auth = getAuth();
        if (user?.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUid(user.uid)
                generateMessage(Message.LoginSuccess, undefined, "success")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
                generateMessage(undefined, Message.LoginFailed, "error")
            });
        }
    }

    function handleLoginGoogle() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // Signed in
            const user = result.user;
            setUid(user.uid)
            generateMessage(Message.LoginSuccess, undefined, "success")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
            generateMessage(undefined, Message.LoginFailed, "error")
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
                const user = userCredential.user;
                setUid(user.uid)
                generateMessage(Message.LoginSuccess, undefined, "success")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
                generateMessage(undefined, Message.LoginFailed, "error")
            });
            }
    }

    return {
        handleLogin,
        handleLoginGoogle,
        handleRegister
    }
}