# Minha Evolução 💗

App pessoal de treino, alimentação e evolução corporal — funciona como PWA (instalável na tela de início do iPhone, funciona offline depois da primeira visita).

## O que tem nessa primeira versão

- **Hoje**: treino do dia, alimentação, água, peso, sequência da semana.
- **Treinos**: rotina semanal fixa (Pernas A/B, Superior A/B, Pilates), registro de carga/repetições/RIR por série, cronômetro de descanso (60/90/120s + ajuste manual), aviso de dor, e sugestão de progressão de carga (nunca aumenta sozinho — sempre pergunta).
- **Alimentação**: estrutura pronta pra quando a dieta chegar (foto/PDF — guardada, mas a leitura automática/OCR fica pra uma próxima versão), checklist diário de refeições, controle de água, sugestões simples de receitas, lista de compras (habilita quando a dieta for lida automaticamente).
- **Evolução**: peso e medidas com gráficos por período, evolução de carga por exercício ("Minha Força"), fotos de evolução (com comparação lado a lado), cardio.
- **Histórico** completo filtrável, **backup** (exportar/importar JSON).

Tudo funciona **sem internet** depois da primeira vez que abrir (os dados ficam só no aparelho, em IndexedDB — nada é enviado pra nenhum servidor).

## Arquivos

```
minha-evolucao/
├── index.html              ← o app inteiro (interface + lógica)
├── manifest.webmanifest    ← configuração do PWA
├── sw.js                   ← service worker (cache offline)
├── icon-192.png
└── icon-512.png
```

Não tem passo de build — são arquivos estáticos prontos pra subir em qualquer hospedagem.

## Como publicar (hospedagem HTTPS)

PWA **exige HTTPS** pra funcionar (exceto em `localhost`). Qualquer uma dessas opções gratuitas funciona bem:

**GitHub Pages** (o que você já usa):
1. Crie um repositório novo (ex: `minha-evolucao`).
2. Suba todos os 5 arquivos desta pasta pra raiz do repositório.
3. Settings → Pages → Branch: `main` → pasta `/ (root)` → Save.
4. Espere 1-2 minutos, o link aparece no topo (`https://seu-usuario.github.io/minha-evolucao/`).

**Cloudflare Pages** ou **Netlify**: funcionam igual, arrastando a pasta inteira.

⚠️ Importante: publique a **pasta inteira** (os 5 arquivos juntos), não só o `index.html` — sem o `manifest.webmanifest`, o `sw.js` e os ícones, o app ainda funciona, mas não vira um PWA instalável de verdade.

## Como instalar no iPhone

1. Abra o link publicado no **Safari** (funciona só no Safari, não no Chrome do iPhone).
2. Toque no ícone de **Compartilhar** (o quadrado com a seta pra cima).
3. Toque em **"Adicionar à Tela de Início"**.
4. Pronto — abre em tela cheia, com ícone próprio, como um app de verdade.

## Como atualizar depois

Sempre que editar o `index.html` (ou qualquer arquivo) e subir a nova versão:

1. Abra o arquivo `sw.js`.
2. Troque o número da versão nesta linha:
   ```js
   const CACHE_NAME = 'minha-evolucao-v1';
   ```
   Para:
   ```js
   const CACHE_NAME = 'minha-evolucao-v2';
   ```
3. Suba os arquivos de novo.

Sem esse passo, quem já instalou o app no iPhone continua vendo a versão antiga guardada em cache — o número da versão é o que avisa o telefone "essa é uma versão nova, busca de novo".

## Backup dos dados

Os dados ficam só no aparelho onde o app foi usado (IndexedDB do navegador). Isso significa:
- Trocar de aparelho **não** traz os dados automaticamente.
- Limpar os dados do navegador/Safari apaga tudo.

Por segurança, use **Mais → Exportar meus dados** de vez em quando — gera um arquivo `.json` que você pode guardar (iCloud, email pra você mesma, etc.) e trazer de volta em **Mais → Importar meus dados**, inclusive em outro aparelho.

## O que ainda não está pronto (próximas versões)

- Leitura automática (OCR/IA) da dieta em foto/PDF — hoje o arquivo é só guardado pra consulta.
- Lista de compras organizada por categoria (depende da leitura automática acima).
- Receitas sugeridas com base na dieta real (hoje é uma lista simples e genérica).
- Notificações/lembretes (de treino e de água).
- Sincronização entre aparelhos / login / backup automático na nuvem.
- Remarcar oficialmente um treino pra outro dia (hoje, um jeito prático de contornar isso: vá em **Treinos** e comece o treino do dia que você quer repor — o app registra certinho o que você realmente fez naquele dia, só não tem uma tela dedicada de "remarcar").

## Aviso

Este aplicativo é uma ferramenta de acompanhamento e **não substitui** orientação de profissional de educação física, nutricionista ou médico.
