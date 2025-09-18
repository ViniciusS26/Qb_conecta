export default {
  message: {
    delete: "Deseja realmente remover o item <b>{0}</b>?",
    thanks: {
      title: "Obrigado por assinar o ZapServer 🚀!",
      message:
        "Estamos animados por tê-lo a bordo e estamos aqui para ajudar em qualquer coisa que você precisar. <br />Se precisar de algo, entre em contato!",
    },
    freePlan:
      "Você está usando o plano <b>Free</b> do ZapServer. <b>Com o plano Free você pode criar até 5 links de WhatsApp.</b>",
    freePlanLimit:
      "Você atingiu o limite de links para o plano Free. Para criar mais links, faça um upgrade para o plano Vip ou Premium.",
    premiumPlanLimit:
      "Você atingiu o limite de links para o plano Premium. Para criar mais links, faça um upgrade para o plano Vip.",
    updatedHub: "Link atualizado com sucesso!",
    createdHub: "Link criado com sucesso!",
    failOnCreateHub:
      "Ocorreu um erro ao salvar o item. Tente novamente ou entre em contato conosco!",
    slugAlreadTaken:
      "O link /<b>{0}</b> já está em uso! Escolha outro, por favor.",
    invalidSlug: "O link /<b>{0}</b> está inválido! Escolha outro, por favor.",
    confirmEmail: {
      button: "Reenviar",
      message1:
        "Você receberá um e-mail com um link para confirmar seu cadastro. Clique no link para concluir a confirmação.",
      message2:
        "Não se esqueça de verificar a pasta de spam, caso o e-mail não apareça na sua caixa de entrada.",
      message3:
        "Se não receber o e-mail dentro de 5 minutos, clique em 'Reenviar'.",
      password:
        "Você receberá um e-mail com um link para realizar a recuperação de senha. Clique no link recebido para para a proxima etapa.",
      backForgot: "Voltar para esqueci minha senha",
      backLogin: "Voltar para login",
    },
    resendVerifyEmail: {
      title: "Confirmação de reenvio",
      message:
        "Você receberá um e-mail com um link para confirmar seu cadastro. Caso não receba o link novamente entre em contato com o suporte.",
      button: "Entrar em contato com o suporte",
    },
    forgotPassword: {
      title: "Reiniciar senha",
      message:
        "Por favor, insira o seu e-mail associado à sua conta do ZapServer. Enviaremos um link para redefinição de senha para o e-mail cadastrado.",
      button: "Enviar",
    },
    resetPassword: {
      title: "Redefinir senha",
      message: "Por favor, insira a nova senha e repita para confirmar.",
      button: "Redefinir",
    },
    connectedNumbers: {
      dialogs: {
        reload: {
          title: "Recarregar conexão",
          message:
            "Ao recarregar, nós iremos reiniciar a conexão com o WhatsApp, essa ação em alguns casos pode gerar um novo QR Code.",
          btnConfirm: "Recarregar",
        },
        disconnect: {
          title: "Desconectar conexão",
          message:
            "Sua conexão será desativada e a API ficará inativa, mas você poderá conectar novamente a qualquer momento.",
          btnConfirm: "Desconectar",
        },
        connect: {
          title: "Conectar conexão",
          message:
            "Sua conexão será reconectada ao WhatsApp. Em alguns casos, pode ser necessário escanear um novo QR Code.",
          btnConfirm: "Conectar",
        },
      },
    },
  },
  formData: {
    register: {
      registerYourAccount: "Cadastre sua conta",
      name: "Qual seu nome?",
      email: "Qual seu email?",
      password: "Senha",
      repeatPassword: "Repita sua senha",
      haveAccount: "Já tem uma conta?",
      register: "Cadastrar",
    },
    login: {
			title: "Olá, faça seu Login ou crie uma conta! ",
      email: "Email",
      emailField: "Digite seu email",
      password: "Senha",
      passwordField: "Digite a senha",
      forgotPassword: "Esqueci minha senha",
      or: "ou",
      register: "Cadastrar-se",
    },
  },
  sort: {
    createdAtAsc: "Criados primeiro",
    createdAtDesc: "Criados por último",
    viewsDesc: "Mais visitados",
    viewsAsc: "Menos visitados",
    sort: "Ordenar",
  },
  button: {
    close: "Fechar",
    cancel: "Cancelar",
    delete: "Excluir",
    ok: "Ok",
    plans: "Ver Planos",
    search: "Pesquisar",
    newLink: "Novo",
    cardNewConnection: "Nova Conexão",
    orderBy: "Ordenar",
    googleLogin: "Continuar com Google",
    login: "Login",
  },
  home: {
    connections: "Conexões",
    details: "Detalhamento da Conexão",
    copyId: "Copiar ID",
    title: "Links de WhatsApp",
    search: "Pesquisar",
    tips: {
      title: "O que é um Link de WhatsApp?",
      message:
        "Um <b>link  de WhatsApp</b> é um link personalizado que contém apenas um número de WhatsApp. Ele simplifica o processo de contato, permitindo que os usuários cliquem no link para iniciar uma conversa diretamente no WhatsApp com o número associado. Isso elimina a necessidade de adicionar manualmente o número aos contatos e agiliza a comunicação.",
    },
    card: {
      title: {
        unconnected: "Número não conectado",
        disconnected: "Número desconectado",
      },
      subtitle: "Conta nunca vinculada a um número",
      actions: {
        connect: "Desconectar",
        disconnect: "Reconectar",
        delete: "Deletar",
        reload: "Recarregar",
        webhook: "Webhook",
      },
    },
    dialogs: {
      cancel: "Cancelar",
      disconnect: {
        title: "Desconectar conexão",
        message:
          "Sua conexão será desativada e a API ficará inativa, mas você poderá conectar novamente a qualquer momento.",
        btnConfirm: "Desconectar",
      },
      connect: {
        title: "Gerar QR Code",
        message:
          "Clique no botão abaixo para gerar seu QR Code. Após gerar o QR Code, escaneie-o com seu WhatsApp para iniciar a conexão.",
        btnConfirm: "Gerar",
        nodeEndpoint: "Endpoint node",
        nodeEndpointPlaceholder: "Url do seu node",
      },
      delete: {
        title: "Deletar conexão?",
        message:
          "Ao deletar sua conexão, seu WhatsApp será desconectado da plataforma e sua api será desativada, e seus dados serão removidos.",
        btnConfirm: "Deletar",
      },
      webhook: {
        title: "Webhook",
        message: "URL do seu webhook",
        placeholder: "Digite sua url",
        btnConfirm: "Alterar Webhook",
      },
      reload: {
        title: "Recarregar conexão",
        message:
          "Ao recarregar, nós iremos reiniciar a conexão com o WhatsApp, essa ação em alguns casos pode gerar um novo QR Code.",
        btnConfirm: "Recarregar",
      },
      readyQrCode: {
        title: "Leia o QR Code",
        message:
          "Seu QRCode está pronto! Escaneie-o com seu WhatsApp para iniciar a conexão.",
      },
      qrcode: {
        title1: "Gere o QR code",
        title2: "Leia o QR code",
        message1:
          "Clique no botão abaixo para gerar seu QR Code e iniciar a conexão.",
        message2: "Escaneie o QR code abaixo para iniciar a conexão.",
        btn: "Gerar QR code",
        nodeBtn: "Inserir endpoint do Node",
        help: "Precisa de ajuda? Clique aqui para assisitr ao vídeo explicativo.",
      },
    },
  },
  connections: {
    tooltips: {
      newConnection: "Criar nova conexão",
    },
    cards: {
      status: {
        READY: "Conectado",
        DISCONNECTED: "Desconectado",
        WAITING: "Aguardando",
        QR_CODE_RECEIVED: "QR Code recebido",
        STARTING: "Iniciando",
      },
    },
  },
  events: {
    header: "Eventos",
    table: {
      headers: {
        date: "Data e Hora",
        event: "Evento",
        details: "Detalhes",
        status: "Status",
        data: "Dados",
      },
    },
    filters: {
      dateStart: "Data início",
      dateEnd: "Data fim",
      placeholderDate: "dd/mm/aaaa",
      status: "Status",
    },
    dialogs: {
      details: {
        title: "Detalhes do evento",
        close: "Fechar",
      },
    },
    btn: {
      details: "Detalhes",
    },
  },
  alerts: {
    header: "Alertas",
    labelText: "Selecione uma conexão para filtrar.",
    btn: {
      newAlert: "Criar alerta",
      addAlertContact: "Adicionar contato",
      chengeContact: "Alterar contato",
      deleteAlert: "Deletar alerta",
    },
    tooltips: {
      addContact:
        "Adicionar o número de telefone que receberá as notificações de alteração de status de conexões.",
      changeContact:
        "Alterar o número de telefone que receberá as notificações de alteração de status de conexões.",
    },
    dialogs: {
      title: "Adicionar telefone",
      mensage:
        "Digite o número de telefone que receberá as notificações de alteração de status de conexões.",
      btn: {
        cancel: "Cancelar",
        confirm: "Salvar",
      },
    },
  },
  profile: {
    header: "Área do Usuário",
    cards: {
      editProfile: {
        profileChanger: "Editar Perfil",
        labels: {
          name: "Nome Completo",
          email: "Email",
          phone: "Telefone",
        },
        btn: {
          saveProfile: "Salvar Altrações",
        },
      },
      editPassword: {
        passwordChange: "Alterar Senha",
        passwordPermission: "Alterar",
        labels: {
          currentPassword: "Senha atual",
          newPasswordField: "Nova senha",
          confirmPasswordField: "Confirmar senha",
        },
        steps: {
          verifyPassword: "Altenticação",
          changePassword: "Nova Senha",
        },
        btn: {
          passwordChangeAltentication: "Confirmar alteração de senha",
          savePassword: "Salvar Senha",
        },
      },
    },
  },
  editProfile: {
    header: "Minha Conta",
    accountData: {
      title: "Dados Pessoais",
      labels: {
        fullName: "Nome completo",
        email: "E-mail",
        recoveryEmail: "E-mail de notificações",
        phone: "Telefone",
      },
    },
    changePassword: {
      title: "Alterar Senha",
      labels: {
        newPassword: "Digite sua nova senha",
        confirmPassword: "Confirmar nova senha",
      },
    },
		apiKey: {
			title: "Conexão via API",
			labels: {
				apiKey: "API Key",
				createdAt: "Data de criação",
				lastUsedAt: "Último acesso da API",
				neverUsed: "Nunca utilizada",
			},
		},
    btn: {
      save: "Salvar",
    },
  },
  menu: {
    plans: "Assine nossos planos",
    exit: "Sair",
    fixMenu: "Fixar Menu",
    fixedMenu: "Menu Fixo",
    home: "Inicio",
		partners: "Sócios",
		projects: "Projetos",
		mensality: "Financeiro",
  },
  footer: {
    terms: "Termos e Políticas",
  },
};
