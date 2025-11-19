import uvicorn
from fastapi import FastAPI
from routers import router_login, router_user_associate, router_projetos, router_despesas, router_receitas, router_mensalidade
from connection.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware


#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    #"http://frontend:8000", # ambiente de desenvolvimento local
    "http://54.207.3.49", # IP do servidor EC2
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

app.include_router(router_login.router)
app.include_router(router_user_associate.router)
app.include_router(router_projetos.router)
app.include_router(router_despesas.router)
app.include_router(router_receitas.router)
app.include_router(router_mensalidade.router)
