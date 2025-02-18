function Register() {
    return (
        <>
            <h2>Registrarse</h2>
            <form>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="name" id="name" placeholder="Juan Carlos" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="exmple@hotmail.com" required />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="********" required />
                </div>
                <button>Registrarse</button>
            </form>
        </>
    )
}

export default Register