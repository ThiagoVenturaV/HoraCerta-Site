# Hora Certa — Landing page

Landing page oficial do aplicativo Android Hora Certa. O site apresenta os recursos do app, explica as permissões necessárias e disponibiliza o APK para instalação direta.

## Desenvolvimento local

```powershell
npm.cmd install
npm.cmd run dev
```

Abra `http://localhost:3000`.

## Validação

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --omit=dev
```

## Stack

- React 19 e Next.js 16 via Vinext;
- TypeScript;
- GSAP e ScrollTrigger;
- Lucide React;
- OpenAI Sites / Cloudflare para preview e hospedagem.

O APK distribuído pelo site fica em `public/downloads/HoraCerta-v0.1.0.apk`.
