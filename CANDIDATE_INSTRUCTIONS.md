# Instruções para o Candidato

## Bem-vindo ao Teste Técnico — React Native Developer

Você recebeu o projeto **TaskNotes**, um aplicativo simples de gerenciamento de notas pessoais.

**Tempo estimado:** 60–90 minutos.

---

## Sua Missão

Escolha **uma das features abaixo** e implemente-a no projeto.

> A escolha é sua — não há resposta certa. Se terminar antes do tempo, sinta-se à vontade para atacar mais de uma.

---

### Feature A — Ordenação de Notas

Adicione a possibilidade de ordenar as notas exibidas na `HomeScreen`.

**Requisitos:**
1. O usuário pode escolher entre pelo menos 2 modos de ordenação: **mais recente**, **mais antigo** e/ou **título A-Z**
2. Crie um **hook customizado** `useNoteSort` que encapsula a lógica de ordenação
3. Integre o hook na `HomeScreen` sem quebrar o filtro de busca/categoria existente
4. Tipagem TypeScript completa (type/enum para os modos)

---

### Feature B — Edição de Notas

Adicione a funcionalidade de editar uma nota já existente.

**Requisitos:**
1. Na `NoteDetailScreen`, adicione um botão **"Editar"**
2. Ao clicar, os campos de título e conteúdo tornam-se editáveis
3. Botões **"Salvar"** e **"Cancelar"** gerenciam a confirmação ou descarte das alterações
4. Implemente a função `updateNote(id, payload)` no `NotesContext` — persista a alteração via `storage` e atualize o campo `updatedAt`
5. (Bônus) Crie um hook `useNoteEditor` para encapsular o estado local de edição

---

### Feature C — Módulo Nativo HapticFeedback

Crie um módulo nativo de feedback tátil do zero para iOS e Android.

**Requisitos:**
1. **Android** (`HapticFeedbackModule.kt`): use `VibrationEffect` / `Vibrator` para gerar feedback com diferentes intensidades
2. **iOS** (`HapticFeedbackModule.m`): use `UINotificationFeedbackGenerator` ou `UIImpactFeedbackGenerator`
3. Exponha um método `trigger(type)` onde `type` pode ser `'success'`, `'warning'` ou `'error'`
4. Registre o módulo corretamente na bridge (Android: `Package` + `MainApplication`; iOS: descoberta automática via `RCT_EXPORT_MODULE`)
5. Crie o wrapper TypeScript em `src/native/HapticFeedback.ts` com fallback para ambientes sem módulo
6. Integre em pelo menos **uma ação** do app (ex: criar nota, deletar, favoritar)

---

## Repositório do Projeto

Crie um fork do repositório abaixo:

**Projeto:** https://github.com/alperensin/TaskNotesApp

Após criar o fork, faça o clone do seu repositório:

```bash
git clone https://github.com/<seu-usuario>/TaskNotesApp.git

cd TaskNotesApp
```

Opcionalmente, adicione o repositório original como upstream:

```bash
git remote add upstream https://github.com/alperensin/TaskNotesApp.git
```

Verifique a configuração:

```bash
git remote -v
```

Resultado esperado:

```bash
origin    https://github.com/<seu-usuario>/TaskNotesApp.git
upstream  GitHub - alperensin/TaskNotesApp
```

---

## Setup do Projeto

```bash
# Instalar dependências
cd TaskNotesApp
yarn install

# iOS (macOS apenas)
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

---

## Desenvolvimento

Antes de iniciar a implementação, crie uma branch para seu trabalho:

```bash
git checkout -b feature/minha-implementacao
```

Exemplo:

```bash
git checkout -b feature/filtro-de-notas
```

Durante o desenvolvimento, considere:

- Organização e legibilidade do código;
- Reutilização de componentes;
- Boas práticas de React Native e TypeScript;
- Gerenciamento de estado;
- Tratamento adequado de erros;
- Experiência do usuário;
- Consistência com a estrutura existente da aplicação.

---

## Histórico de Commits

Realize commits que demonstrem a evolução da sua implementação.

Exemplos:

```bash
git add .

git commit -m "Cria estrutura inicial da funcionalidade"
```

```bash
git commit -m "Implementa lógica principal"
```

```bash
git commit -m "Realiza ajustes finais e melhorias visuais"
```

---

## Entrega da Solução

Envie sua branch para seu fork:

```bash
git push origin feature/minha-implementacao
```

Em seguida, crie um Pull Request para o repositório original.

### Configuração do Pull Request

**Base Repository**

```text
alperensin/TaskNotesApp
```

**Base Branch**

```text
main
```

**Compare Repository**

```text
<seu-usuario>/TaskNotesApp
```

**Compare Branch**

```text
feature/minha-implementacao
```

---

## Descrição do Pull Request

Utilize o seguinte modelo:

```markdown
## Funcionalidade Implementada

Descreva a funcionalidade escolhida.

## Alterações Realizadas

- Alteração 1
- Alteração 2
- Alteração 3

## Decisões Técnicas

Descreva as principais decisões adotadas durante a implementação.

## Melhorias Futuras

Liste possíveis melhorias que poderiam ser realizadas.
```

---

## Apresentação na Entrevista

Durante a entrevista você deverá:

1. Executar o aplicativo.
2. Demonstrar a funcionalidade implementada.
3. Explicar as decisões técnicas adotadas.
4. Navegar pelo código-fonte e apresentar as principais alterações realizadas.
5. Apresentar o Pull Request criado.
6. Responder perguntas relacionadas à implementação.

---

## Observações Importantes

- A aplicação deve compilar e executar corretamente.
- A funcionalidade escolhida deve estar totalmente funcional.
- O Pull Request deve ser criado antes da entrevista.
- Esteja preparado para explicar sua solução, decisões técnicas, dificuldades encontradas e possíveis melhorias futuras.
- Caso utilize bibliotecas externas, justifique sua utilização durante a apresentação.

---

## Regras

- ✅ Pode consultar documentação oficial (React Native, React, TypeScript)
- ✅ Pode usar Stack Overflow e ferramentas de busca
- ✅ Pode instalar bibliotecas adicionais se justificar
- ❌ Não use IA generativa (ChatGPT, Copilot, etc.)
- ❌ Não peça ajuda a terceiros

---

Boa sorte! 🚀
