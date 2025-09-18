<template>
	<v-container class="fill-height">
		<v-responsive class="align-centerfill-height mx-auto" max-width="1200">
			<div class="text-center pa-4">
				<v-dialog
				v-model="dialog"
				fullscreen
				:scrim="false"
				transition="dialog-bottom-transition"
				>	
					<v-row no-gutters>
						<v-col md="6" class="hide-on-mobile">
							<v-img
								src="@/assets/LogScrImage.png"
								height="100vh"
								width="100vw"
								cover
							></v-img>
						
						</v-col>
						<v-col md="6">
							<v-card
								height="100vh"
								color="white"
								class="d-flex flex-column justify-center align-center"
							>
								<v-card
									flat
									color="white"
									width="407px"
									class="d-flex flex-column justify-center align-center"
								>
									<v-row no-gutters>
										<v-col md="12">
											<div class="login-card">
												<div class="mt-5 mb-4 d-flex flex-column align-center">
													<v-img src="@/assets/Logo1.png" width="250"/>
												</div>
											</div>
										</v-col>
										<v-col class="mt-5 mb-4 d-flex flex-column align-center" md="12">
											<v-btn v-if="showGoogle" prepend-icon="mdi-google" class="mt-2" @click="onGoToGoogleLogin" color="white" width="400">
												Continuar com o Google
											</v-btn>
										</v-col>
										<v-col class="mt-5 mb-4" md="12" >
											<v-row class="justify-center align-center">
												<v-col cols="5">
												<v-divider></v-divider>
												</v-col>
												<v-col cols="auto" class="text-center">
												<span>ou</span>
												</v-col>
												<v-col cols="5">
												<v-divider></v-divider>
												</v-col>
											</v-row>
										</v-col>
										<v-col md="12">
											<span >Email</span>
											<v-text-field
												placeholder="usuario@exemplo.com"
												variant="outlined"
												density="compact"
											></v-text-field>
										</v-col>
										<v-col md="12">
											<span >Senha</span>
											<v-text-field
												:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
												:type="visible ? 'text' : 'password'"
												density="compact"
												placeholder="Digite a senha"
												variant="outlined"
												@click:append-inner="visible = !visible"
											></v-text-field>
											<div class="text-subtitle-1 d-flex align-center justify-space-between">
												<v-spacer></v-spacer>
												<a
												class="text-caption text-decoration-none text-blue"
												href="#"
												rel="noopener noreferrer"
												target="_blank"
												>
												Forgot login password?</a>
											</div>
										</v-col>
										<v-col class="mt-5 mb-4 d-flex flex-column align-center" md="12">
											<v-btn color="primary" width="400">
												<span class="text_btn">Realizar Login</span>
											</v-btn>
										</v-col>
										<v-col class="mt-5 mb-4 d-flex flex-column align-center" md="12">
											<v-btn class="cadastre" color="white" width="400">
												<span class="cadText">Cadastre agora mesmo</span>
											</v-btn>
										</v-col>
									</v-row>
								</v-card>
							</v-card>
						</v-col>

					</v-row>
				</v-dialog>
			</div>
			
		</v-responsive>
	</v-container>
</template>
  
<script>
  import { toast } from 'vue3-toastify';
  import validator from "email-validator";
  import { useUserStore } from '@/stores/user.store';
  import { goToGoogleLogin, goToFacebookLogin, sendLoginMail } from '@/services/auth.service';

  const userStore = useUserStore();

  export default {
    data() {
      return {
		visible: false,
        isSending: false,
        loginMailSent: false,
        email: "",
        timer: 0,
      }
    },

    methods: {
      onGoToGoogleLogin() {
        goToGoogleLogin();
      },

      onGoToFacebookLogin() {
        goToFacebookLogin();
      },

      async onSendLoginMail() {
        if (!this.isEmailValid) {
          toast.error('Informe um e-mail válido!');
          return;
        }

        try {
          this.isSending = true;
          this.loginMailSent = false;
          await sendLoginMail(this.email);
          this.loginMailSent = true;
          this.timer = 60;

          const interval = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
              clearInterval(interval);
            }
          }, 1000);
        } catch (e) {
          toast.error('Ocorreu um erro ao enviar o e-mail de login!');
        } finally {
          this.isSending = false;
        }
      }
    },

    computed: {
      dialog() {
        return userStore.canShowLogin && !userStore.isLogged;
      },
      showGoogle() {
        return !userStore.isInstagram;
      },  

      isEmailValid() {
        return validator.validate(this.email);
      },
    }
  };
  </script>

<style scoped>
.login-card {
  min-width: 250px !important;
  max-width: 440px !important;
  width: 90%;
  margin: 0 auto;
}
.text_btn {
  color: white;
}
.cadastre {
  border: 2px solid #29d53a;
  
}
.cadText {
  	color: #29d53a;
  }
</style>