import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../contexts/MessageContextProvider";

export enum Message {
    CreatedProject = "Projeto criado com sucesso",
    EditedProject = "Projeto alterado com sucesso",
    RemovedProject = "Projeto removido com sucesso",
    CreatedService = "Serviço criado com sucesso",
    EditedService = "Serviço alterado com sucesso",
    RemovedService = "Serviço excluido com sucesso",
    FailedCreateProject = "Erro ao criar projeto, tente novamente mais tarde",
    FailedEditProject = "Erro ao editar projeto, tente novamente mais tarde",
    FailedRemoveProject = "Erro ao remover projeto, tente novamente mais tarde",
    FailedCreateService = "Erro ao criar serviço, tente novamente mais tarde",
    FailedEditService = "Erro ao editar serviço, tente novamente mais tarde",
    FailedRemovedService = "Erro ao remover serviço, tente novamente mais tarde",
    BudgetBelowCost = "O orçamento não pode ser menor que o custo do projeto",
    ServiceExpensive = "Valor de serviços ultrapassaram o orçamento",
    LoginSuccess = "Login realizado com sucesso",
    LoginFailed = "Falha no login, verifique os dados e tente novamente",
    EmailInvalid = 'Insira um email válido',
    PasswordInvalid = 'Insira uma senha válida'
}

export default function useMessage() {

    const messageContext = useContext(MessageContext)

    const { setMessage } = messageContext

    const navigate = useNavigate()

    const { id } = useParams()

    
    const generateMessage = (messageSuccess?: Message, messageError?: Message, type?: "success" | "error") => {
        
        switch (type) {

            case "success":

                setMessage({

                    message: messageSuccess,

                    type: type

                })

                navigate((id ? `/projects/${id}` : `/projects`))

                break;

            case "error":

                setMessage({

                    message: messageError,

                    type: type

                })

                navigate((id ? `/projects/${id}` : `/projects`))

                break

        };

        const timer = setTimeout(() => {

            setMessage(undefined)
            
        }, 3000)

        return () => clearTimeout(timer)
    }
    
    return {
        generateMessage
    }
}