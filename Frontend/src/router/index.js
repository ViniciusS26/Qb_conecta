// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { patch } from "@/services/axios";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true, preload: true },
      },
        {
				path: "socios",
				children: [
					{
						path: "",
						name: "Sócios",
						component: () => import("@/views/Socios.vue"),
						meta: { requiresAuth: true, preload: true },
					},
					{
						path: "adicionar",
						name: "Adicionar Socio",
						component: () => import("@/views/AddSocio.vue"),
						meta: { requiresAuth: true, preload: true },
					}
				]
			},
			{
				path: "projetos",
				children: [
					{
						path: "",
						name: "Projetos",
						component: () => import("@/views/Projetos.vue"),
						meta: { requiresAuth: true, preload: true },
					},
					{
						path: "adicionar",
						name: "Adicionar Projeto",
						component: () => import("@/views/AddProjeto.vue"),
						meta: { requiresAuth: true, preload: true },
					},
				]
			},
			{
				path: "financas",
				children: [
					{
						path: "",
						children: [
							{
								path: "",
								name: "Finanças",
								component: () => import("@/views/Financas.vue"),
								meta: { requiresAuth: true, preload: true },
							},
							{
								path: "adicionar",
								name: "Adicionar Mensalidade",
								component: () => import("@/views/AddMensalidade.vue"),
								meta: { requiresAuth: true, preload: true },
							},
						],
					},
					{
						path: "receitas",
						children: [
							{
								path: "",
								name: "Receitas",
								component: () => import("@/views/Receitas.vue"),
								meta: { requiresAuth: true, preload: true },
							},
							{
								path: "adicionar",
								name: "Adicionar Receita",
								component: () => import("@/views/AddReceita.vue"),
								meta: { requiresAuth: true, preload: true },
							},
						],
					},
					{
						path: "despesas",
						children: [
							{
								path: "",
								name: "Despesas",
								component: () => import("@/views/Despesas.vue"),
								meta: { requiresAuth: true, preload: true },
							},
							{
								path: "adicionar",
								name: "Adicionar Despesa",
								component: () => import("@/views/AddDespesa.vue"),
								meta: { requiresAuth: true, preload: true },
							}
						],
					},
				],
			},
		],
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue"),
		meta: { requiresAuth: false, preload: true },
	},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

// Uma variável para controlar se a verificação inicial de autenticação já foi feita
// Isso evita múltiplos redirecionamentos no carregamento inicial
let isInitialAuthCheckDone = false;

// Guard de navegação para proteger rotas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  // Verificar se o usuário está logado
  if (!userStore.getIsLogged) {
    // Se não está logado e tenta acessar uma rota protegida
    if (to.meta.requiresAuth) {
      // Redireciona para login
      next({ name: "Login" });
    } else {
      // Permite acesso a rotas públicas (como login)
      next();
    }
  } else {
    // Se está logado
    if (to.name === "Login") {
      // Se já está logado e tenta acessar login, redireciona para home
      next({ name: "Home" });
    } else {
      // Permite acesso normal
      next();
    }
  }
});

export default router;
