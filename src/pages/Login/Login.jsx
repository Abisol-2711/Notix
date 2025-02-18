function Login() {
    return (
        <>
            <h2>Iniciar sesión</h2>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="exmple@hotmail.com" required />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="********" required />
                </div>
                <button>Iniciar sesión</button>
                <hr />
                <button>Iniciar con Google</button>
                <button>Iniciar con Facebook</button>
            </form>
        </>
    )
}

export default Login