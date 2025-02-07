import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS

ACESSO_AO_BANCO_DE_DADO = {
    'dbname':'',
    'user':'',
    'password':'',
    'host':'',
    'port':'',
}
def get_db_connection():
    conn = psycopg2.connect(**ACESSO_AO_BANCO_DE_DADO)
    return conn

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "hello world"

@app.route('/criarUsuario', methods=['POST'])
def criarUsuario():
    usuario = request.form.get('usuarioName')
    senha = request.form.get('senhaName')

    if not usuario.isidentifier() or senha.isidentifier():
        raise ValueError('Usuario e Senha Indefinidos')
 
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO lista_de_usuario_tabela(usuario, senha) VALUES (%s, %s);',(usuario, senha))
    conn.commit()
    cursor.close()
    conn.close()

    AcessoAoBanner = True

    data = {
        'AtivaBanner': AcessoAoBanner,
    }



    return jsonify(data)









@app.route('/login', methods=['POST'])
def login():

    
     
     
    usuarioLogin = request.form.get('usuarioLogin')
    senhaLogin = request.form.get('senhaLogin')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM lista_de_usuario_tabela')
    resultado = cursor.fetchall()
    cursor.execute('SELECT * FROM nomedatabela')
    consultaLotesCriado = cursor.fetchall()
    conn.close()
    cursor.close()

    data = {
        'AcessoLiberado': 'liberado',
        'LotesCriados': consultaLotesCriado,
        'CriarLote': 'CriarLotes'
    }

    for usuario in resultado:
        if usuario[0] == usuarioLogin and usuario[1] == senhaLogin:
            return (data)
        
    data2 = {
        'AcessoLiberado': 'não liberado',
    }
        
    return jsonify(data2)



@app.route('/criarTabela')
def criarTabela():

    nomeDaTabela = 'nomedatabela'
    if not nomeDaTabela.isidentifier():
        raise ValueError('Dados Inseridos Irrelevantes')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS {nomeDaTabela} (
                   id SERIAL PRIMARY KEY,
                   nomeLote TEXT NOT NULL,
                   numeroDoLote TEXT NOT NULL,
                   statusLote TEXT NOT NULL)
""")
    cursor.execute(f'SELECT * FROM {nomeDaTabela}')
    tabelaCriada = cursor.fetchall()
    conn.commit()
    conn.close()
    cursor.close()
    
    return jsonify(tabelaCriada) 
    

@app.route('/criarLotes', methods=['POST'])
def criarLote():
    
    nomeLoteName = request.form.get('nomeLoteName')
    numeroLoteName = request.form.get('numeroLoteName')
    statusLoteName = request.form.get('statusLoteName')

    nomeDaTabela = 'nomedatabela'
    if not nomeDaTabela.isidentifier():
         raise ValueError('Valores Invalido')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f'INSERT INTO {nomeDaTabela}(nomeLote, numeroDoLote, statusLote) VALUES (%s, %s, %s);',
                   (nomeLoteName, numeroLoteName, statusLoteName,))
    cursor.execute('SELECT * FROM nomedatabela')
    consultaLotesCriado = cursor.fetchall()
    conn.commit()
    conn.close()
    cursor.close()

    data = {
        'LotesCriados': consultaLotesCriado,
    }

    return jsonify(data)


@app.route('/cunsultaLote')
def consultaLote():

    nomeDaTabela = 'nomedatabela'
    if not nomeDaTabela.isidentifier():
        raise ValueError('Valor Invalido')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('ALTER SEQUENCE nomedatabela_id_seq RESTART WITH 1;')
    cursor.execute('SELECT * FROM nomedatabela')
    consultaLotesCriado = cursor.fetchall()
    conn.commit()
    conn.close()
    cursor.close()

    return jsonify(consultaLotesCriado)


@app.route('/excluirLote', methods=['POST'])
def excluirLote():
    loteExcluido = request.form.get('excluirLoteName')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM nomedatabela WHERE id=%s', (loteExcluido))
    cursor.execute('SELECT * FROM nomedatabela')
    consultaLotesCriado = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()

    data = {
        'LotesCriados': consultaLotesCriado,
    }

    
    return jsonify(data)



if __name__=='__main__':
    app.run(debug=True)
