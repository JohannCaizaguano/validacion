
import { login } from './actions'

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <form action={login} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Iniciar Sesión</h2>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******************"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    )
}
