from sqlalchemy import Column, Date,DateTime, ForeignKey, Integer, String, Float, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from connection.database import Base


# Tabela de associação para User e Projetos
user_projetos = Table(
    'user_projetos', Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('projetos_id', Integer, ForeignKey('projetos.id'), primary_key=True)
)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    email = Column(String, index=True, nullable=False)
    cpf = Column(String, index=True, nullable=False)
    data_nascimento = Column(Date, nullable=False)
    senha = Column(String, nullable=False)
    quantidade = Column(Integer, nullable=False)
    cargo = Column(String, nullable=False)
    dtassociacao = Column(Date, nullable=False)
    mensalidades = relationship("Mensalidade", back_populates="user" )
    projetos = relationship("Projetos", back_populates="user",secondary=user_projetos)
    created_at = Column(DateTime(timezone=True), server_default=func.now(),nullable=True)
    updated_at = Column( DateTime(timezone=True), onupdate=func.now(), nullable=True)





class Mensalidade(Base):
    __tablename__ = 'mensalidades'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    valor = Column(Float, nullable=False, default=5.00)
    dtvencimento = Column(Date, nullable=False)
    dtpagamento = Column(Date, nullable=False)
    status = Column(String, nullable=False)
    iduser = Column(Integer, ForeignKey('user.id'))
    # Relacionamento com User
    user = relationship("User",back_populates="mensalidades")


class Projetos(Base):
    __tablename__ = 'projetos'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    titulo = Column(String, nullable=False)
    dtinicio = Column(Date, nullable=False)
    dtfim = Column(Date, nullable=False)
    # Relacionamento com User
    iduser = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship("User", secondary=user_projetos, back_populates="projetos")


""" class Relatorio(Base):
    __tablename__ = 'relatorios'
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    data = Column(Date, nullable=False, server_default=func.now())
    despesa = relationship("Despesas", back_populates="relatorio")
    receita = relationship("Receitas", back_populates="relatorio") """

class Relatorio(Base):
    __tablename__ = 'relatorios'
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    data = Column(Date, nullable=False, server_default=func.now())
    despesas = relationship("Despesas", back_populates="relatorio")
    receitas = relationship("Receitas", back_populates="relatorio")

class Despesas(Base):
    __tablename__ = 'despesas'
    id = Column(Integer, primary_key=True, autoincrement=True)
    valor = Column(Float)
    data = Column(Date, nullable=False)
    origem = Column(String, nullable=False)
    relatorio_id = Column(Integer, ForeignKey('relatorios.id'))
    relatorio = relationship("Relatorio", back_populates="despesas")



class Receitas(Base):
    __tablename__ = 'receitas'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    valor = Column(Float)
    data = Column(Date, nullable=False)
    origem = Column(String, nullable=False)
    relatorio_id = Column(Integer, ForeignKey('relatorios.id'))
    relatorio = relationship("Relatorio", back_populates="receitas")
   



