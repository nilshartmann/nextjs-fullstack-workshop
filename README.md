# Workshop: Fullstack Anwendungen mit React und Next.js

Dieses Repository (https://github.com/nilshartmann/nextjs-fullstack-workshop) enthält den Source-Code für die Beispiel-Anwendung sowie den Workspace für unsere Übungen. Bitte klone dir das Repository lokal auf deinen Computer.

Im folgenden findest Du beschrieben, wie du den Workspace einrichtest und die Anwendung für die Übung startest.

![Screenshot of example application](screenshot.png)

# Starten des Java Backend

- Per docker-compose:

```bash

docker-compose -f docker-compose-backend.yaml up -d

```

# Öffnen in der IDE / Editor

> [!IMPORTANT]  
> Bitte nur das Verzeichnis `workspace` im Editor öffnen

Ihr könnt auch beide Frontends im Editor öffnen (das "fertige" und den Workspace), dann benutzt unterschiedliche Editor-Instanzen.

# Starten der fertigen Anwendung (als Referenz)

> [!IMPORTANT]  
> Die Packages werden mit [pnpm](https://pnpm.io/installation) installiert. Npm sollte aber auch funktionieren.

```bash

cd frontend_nextjs

pnpm install
pnpm dev:clean

```

# Starten des Workspaces (fast leere Anwendung)

```bash

cd workspace

pnpm install
pnpm dev:clean

```

# Ports und Pfade

| Anwendung                   | URL                                         |
| --------------------------- | ------------------------------------------- |
| / Fertige Next.js-Anwendung | http://localhost:8110                       |
| Next.js Workspace           | http://localhost:8100                       |
| Java Backend (API)          | http://localhost:8080                       |
| Swagger UI                  | http://localhost:8080/swagger-ui/index.html |
| Keycloak                    | http://localhost:8200                       |
