export default {
  message: {
    delete: "Do you really want to remove the item <b>{0}</b>?",
    thanks: {
      title: "Thank you for signing up for ZapServer 🚀!",
      message:
        "We're excited to have you on board and are here to help with anything you need. <br />If you need anything, please contact us!",
    },
    freePlan:
      "You are using the <b>Free</b> ZapServer plan. <b>With the Free plan you can create up to 5 WhatsApp links.</b>",
    freePlanLimit:
      "You have reached the link limit for the Free plan. To create more links, upgrade to the Vip or Premium plan.",
    premiumPlanLimit:
      "You have reached the link limit for the Premium plan. To create more links, upgrade to the Vip plan.",
    updatedHub: "Link updated successfully!",
    createdHub: "Link created successfully!",
    failOnCreateHub:
      "An error occurred while saving the item. Please try again or contact us!",
    slugAlreadTaken:
      "The link /<b>{0}</b> is already in use! Please choose another one.",
    invalidSlug: "The link /<b>{0}</b> is invalid! Please choose another one.",
    confirmEmail: {
      button: "Resend",
      message1:
        "You will receive an email with a link to confirm your registration. Click the link to complete the confirmation.",
      message2:
        "Don't forget to check your spam folder if the email doesn't appear in your inbox.",
      message3:
        "If you don't receive the email within 5 minutes, click 'Resend'.",
      password:
        "You will receive an email with a link to reset your password. Click the received link to proceed to the next step.",
      backForgot: "Back to forgot password",
      backLogin: "Back to login",
    },
    resendVerifyEmail: {
      title: "Resend confirmation",
      message:
        "You will receive an email with a link to confirm your registration. If you don't receive the link again, please contact support.",
      button: "Contact support",
    },
    forgotPassword: {
      title: "Reset password",
      message:
        "Please enter your email associated with your ZapServer account. We will send a password reset link to your registered email.",
      button: "Send",
    },
    resetPassword: {
      title: "Reset password",
      message: "Please enter your new password and repeat to confirm.",
      button: "Reset",
    },
  },
  formData: {
    register: {
      registerYourAccount: "Register your account",
      name: "What's your name?",
      email: "What's your email?",
      password: "Password",
      repeatPassword: "Repeat your password",
      haveAccount: "Already have an account?",
      register: "Register",
    },
    login: {
      email: "Email",
      emailField: "Enter your email",
      password: "Password",
      passwordField: "Enter password",
      forgotPassword: "Forgot password",
      or: "or",
      register: "Register now",
    },
  },
  sort: {
    createdAtAsc: "Created first",
    createdAtDesc: "Created last",
    viewsDesc: "Most visited",
    viewsAsc: "Least visited",
    sort: "Sort",
  },
  button: {
    close: "Close",
    cancel: "Cancel",
    delete: "Delete",
    ok: "Ok",
    plans: "View Plans",
    search: "Search",
    newLink: "New",
    cardNewConnection: "New Connection",
    orderBy: "Sort",
    googleLogin: "Continue with Google",
    login: "Login",
  },
  home: {
    connections: "Connections",
    details: "Connection Details",
    copyId: "Copy ID",
    title: "WhatsApp Links",
    search: "Search",
    tips: {
      title: "What is a WhatsApp Link?",
      message:
        "A <b>WhatsApp link</b> is a customized link that contains only a WhatsApp number. It simplifies the contact process, allowing users to click the link to start a conversation directly on WhatsApp with the associated number. This eliminates the need to manually add the number to contacts and streamlines communication.",
    },
    card: {
      title: {
        unconnected: "Number not connected",
        disconnected: "Number disconnected",
      },
      subtitle: "Account never linked to a number",
      actions: {
        connect: "Disconnect",
        disconnect: "Reconnect",
        delete: "Delete",
        reload: "Reload",
        webhook: "Webhook",
      },
    },
    dialogs: {
      cancel: "Cancel",
      disconnect: {
        title: "Disconnect connection",
        message:
          "Your connection will be deactivated and the API will be inactive, but you can connect again at any time.",
        btnConfirm: "Disconnect",
      },
      connect: {
        title: "Generate QR Code",
        message:
          "Click the button below to generate your QR Code. After generating the QR Code, scan it with your WhatsApp to start the connection.",
        btnConfirm: "Generate",
        nodeEndpoint: "Node endpoint",
        nodeEndpointPlaceholder: "Your node url",
      },
      delete: {
        title: "Delete connection?",
        message:
          "When you delete your connection, your WhatsApp will be disconnected from the platform and your API will be deactivated, and your data will be removed.",
        btnConfirm: "Delete",
      },
      webhook: {
        title: "Webhook",
        message: "Your webhook URL",
        placeholder: "Enter your url",
        btnConfirm: "Change Webhook",
      },
      reload: {
        title: "Reload connection",
        message:
          "When reloading, we will restart the WhatsApp connection, this action in some cases may generate a new QR code.",
        btnConfirm: "Reload",
      },
      readyQrCode: {
        title: "Scan the QR Code",
        message:
          "Your QR Code is ready! Scan it with your WhatsApp to start the connection.",
      },
      qrcode: {
        title1: "Generate QR code",
        title2: "Scan QR code",
        message1:
          "Click the button below to generate your QR Code and start the connection.",
        message2: "Scan the QR code below to start the connection.",
        btn: "Generate QR code",
        nodeBtn: "Insert node endpoint",
        help: "Need help? Click here to watch the explanatory video.",
      },
    },
  },
  connections: {
    tooltips: {
      newConnection: "Create new connection",
    },
    cards: {
      status: {
        READY: "Connected",
        DISCONNECTED: "Disconnected",
        WAITING: "Waiting",
        QR_CODE_RECEIVED: "QR Code received",
        STARTING: "Starting",
      },
    },
  },
  events: {
    header: "Events",
    table: {
      headers: {
        connection: "Connection",
        date: "Date and Time",
        event: "Event",
        details: "Details",
        status: "Status",
        data: "Data",
      },
    },
    filters: {
      dateStart: "Date start",
      dateEnd: "Date end",
      status: "Status",
      placeholderDate: "mm/dd/yyyy",
    },
    dialogs: {
      details: {
        title: "Event details",
        close: "Close",
      },
    },
    btn: {
      details: "Details",
    },
  },
  alerts: {
    header: "Alerts",
    labelText: "Select a connection to filter.",
    btn: {
      newAlert: "Create alert",
      addAlertContact: "Add contact",
      chengeContact: "Change contact",
      deleteAlert: "Delete alert",
    },
    tooltips: {
      addContact:
        "Add the phone number that will receive connection status change notifications.",
      changeContact:
        "Change the phone number that will receive connection status change notifications.",
    },
    dialogs: {
      title: "Add phone",
      mensage:
        "Enter the phone number that will receive connection status change notifications.",
      btn: {
        cancel: "Cancel",
        confirm: "Save",
      },
    },
  },
  profile: {
    header: "User Area",
    cards: {
      editProfile: {
        profileChanger: "Edit Profile",
        labels: {
          name: "Full Name",
          email: "Email",
          phone: "Phone",
        },
        btn: {
          saveProfile: "Save Changes",
        },
      },
      editPassword: {
        passwordChange: "Change Password",
        passwordPermission: "Change",
        labels: {
          currentPassword: "Current password",
          newPasswordField: "New password",
          confirmPasswordField: "Confirm password",
        },
        steps: {
          verifyPassword: "Authentication",
          changePassword: "New Password",
        },
        btn: {
          passwordChangeAltentication: "Confirm password change",
          savePassword: "Save Password",
        },
      },
    },
  },
  menu: {
    plans: "Subscribe to our plans",
    exit: "Exit",
    fixMenu: "Fix Menu",
    fixedMenu: "Fixed Menu",
    connections: "Connections",
  },
  footer: {
    terms: "Terms and Policies",
  },
};
