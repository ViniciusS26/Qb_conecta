from fastapi import APIRouter,Depends,HTTPException,status
from fastapi.security import  OAuth2PasswordRequestForm, OAuth2PasswordBearer
from typing import Annotated
from services.security import create_access_token,verify_password,authenticate_user
from sqlalchemy.orm import Session
from connection.dependences import get_db as get_session
from sqlalchemy import select
from models.models import User
from schemas.schema import UserToken, UserResponse
import logging


logging.basicConfig(level=logging.DEBUG)

router = APIRouter(prefix="/login")


"""Criar meotodo loggin para pegar o email e senha do usuário e rtornar os dados do usuário logado"""
@router.post("/auth", response_model=UserResponse)
async def get_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
    """Retorna os dados do usuário logado"""
    user  = authenticate_user(session, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "quantidade": user.quantidade,
        "senha": user.senha,
        "dtassociacao": user.dtassociacao,
        "cpf": user.cpf,
        "data_nascimento": user.data_nascimento,
        "cargo": user.cargo,
        
    }
    
@router.post("/token", response_model=UserToken)
async def login_for_access_token( form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
   
    user  = authenticate_user(session, form_data.username, form_data.password)
   

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario ou senha inválidos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario ou senha inválidos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data_payload={"sub": user.email, "cargo": user.cargo,"token_type": "Bearer", "exp": 30}
    )

    
    return {
        "email": user.email,
        "cargo": user.cargo,
        "access_token": access_token,
        "token_type": "Bearer",
        "exp": 30
    }