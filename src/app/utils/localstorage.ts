export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('app.user')!);

    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('app.token');
        localStorage.removeItem('app.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('app.token')!;
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('app.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('app.user', JSON.stringify(user));
    }

}