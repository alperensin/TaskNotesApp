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

## Regras

- ✅ Pode consultar documentação oficial (React Native, React, TypeScript)
- ✅ Pode usar Stack Overflow e ferramentas de busca
- ✅ Pode instalar bibliotecas adicionais se justificar
- ❌ Não use IA generativa (ChatGPT, Copilot, etc.)
- ❌ Não peça ajuda a terceiros

---

## Entregáveis

1. App rodando com a feature implementada
2. Indicar qual feature escolheu (A, B ou C)
3. (Opcional) Breve comentário sobre decisões técnicas tomadas

---

Boa sorte! 🚀
