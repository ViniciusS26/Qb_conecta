import { toast } from 'vue3-toastify';

const errorCode = {
  "EMAIL_ALREADY_TAKEN": "Email já cadastrado!",
  "Incorrect email or password": "Credenciais inválidas!",
  '"password" is not allowed to be empty': "Campo de senha vazio!",
  "password must be at least 8 characters": "Complete a senha!",
  "Fields": "Campos com dados em formatos incorretos ou vazios!",
  "Email verification failed": "Não foi possível verificar o email!",
  "Cant Paste": "Erro ao colar o token!",
  "Invalid Token": "Token Inválido!",
  "Please authenticate": "Erro na autenticação",
  TOKEN_ALREADY_USED: "Token já cadastrado",
	"Token not found": "Token não encontrado",
  "Paste sucessfuly": "Colado com sucesso!",
  "Bot register": "Bot cadastrado com sucesso!",
  Created: "Conta criada! Enviamos um e-mail para verificar sua conta!",
  "Password reset": "Senha Redefinida!",
  "Email send": "Email enviado!",
  "No users found with this email":
    "Não foi possível concluir a operação de redefinição de senha para o e-mail fornecido!",
  "Bot Delete": "Bot excluído com sucesso!",
  "Saved Training": "Treinamento salvo com sucesso!",
  NOT_FOUND: "Não encontramos resultados!",
  BOT_NOT_FOUND: "Bot não encontrado!",
  "Campaign sending": "Processando envio da campanha!",
  "Invalid fields": "Campos inválidos",
  "Saved successfully": "Salvo com sucesso!",
  "Updated successfully": "Atualizado com sucesso!",
  FALLBACK_ALREADY_EXISTS:
    "Fluxo de exceção já cadastrado para os canais de atendimento.",
  CHAT_IN_PROGRESS: "O chat já está em atendimento.",
  "Name already taken": "Nome já utilizado.",
	"loginSuccess": "Login efetuado com sucesso!",
	"AssocAdictSucess": "Associado cadastrado com sucesso!",
	"Email Password Reset Sent": "Email de redefinição de senha enviado!",
};

export default {
  toastWarning: (error) => {
    let msg = "";
    let code = 0;
    if (error.status) {
      code = error.status;
    }
    switch (code) {
      case 400:
				msg = errorCode[error.statusText] || "Erro não mapeado!";
				break;
			case 401:
				msg = errorCode[error.body.message] || "Erro não mapeado!";
				break;
			case 404:
				msg = errorCode[error.body.message] || "Erro não mapeado!";
				break;
      case 409:
        msg = errorCode[error.body.message] || "Erro não mapeado!";
        break;
      case 0:
        msg = error.toString();
        break;
      default:
        msg = "Erro não mapeado!";
    }
    toast.warning(msg); 
  },
  toastSuccess: (response) => {
    let msg = "";
    switch (response.status) {
      case 200:
        msg = errorCode[response.statusText] || "Sucesso!";
      case 201:
        msg = errorCode[response.statusText] || "Sucesso!";
      case 204:
        msg = errorCode[response.statusText] || "Sucesso!";
        break;
      default:
        msg = errorCode[response.statusText] || response.toString() || "Sucesso!";
    }
    toast.success(msg); 
  },
	toastError: (error) => {
    let msg = "";
    // Defina a lógica de mensagem de erro aqui, semelhante a toastWarning
    if (error.body) {
      // Se o erro tiver uma resposta (por exemplo, um erro de API)
			console.log(error.body);
      msg = error.body.detail || "Erro inesperado!";
		} else if (error.status) {
			msg = errorCode[error.statusText] || error.statusText || "Erro desconhecido!";
    } else {
      msg = "Erro desconhecido!";
    }
    
    toast.error(msg);
  },
};
