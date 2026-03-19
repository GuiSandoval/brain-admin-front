# Módulo Professor

Módulo responsável pelo CRUD completo de professores: cadastro, edição e listagem.

## Estrutura de Arquivos

- `page.tsx` — formulário de cadastro/edição (modo determinado pelo search param `?id=`)
- `lista/page.tsx` — listagem com ações de editar e excluir
- `schema.ts` — schema Zod + tipos + defaultValues do formulário
- `professorUtils.ts` — funções de mapeamento entre formulário ↔ API
- `useProfessorMutations.tsx` — hook com mutations React Query (create, update, delete)
- `styles.ts` — styled-components isolados do módulo

## Considerações Importantes

### Modo edição vs criação
- O modo é determinado pela presença do search param `id`: `useBrainSearchParams("id")`
- `isEditMode = !!professorId`
- Por usar `useSearchParams` internamente, o `page.tsx` exige wrapper `<Suspense>` no componente exportado

### Mapeamento de dados (professorUtils.ts)
- **Form → API POST/PUT**: usar `mapFormDataToProfessorPostRequest` / `mapFormDataToProfessorPutRequest`
- **API → Form (edição)**: usar `mapProfessorResponseToFormData`
- Campos mascarados no formulário devem ser **desmascados** antes de enviar: `unmaskCPF`, `unmaskRG`, `unmaskCEP`, `unmaskPhone` (de `@/utils/utils`)
- Datas: o formulário usa `dd/mm/aaaa`, a API usa ISO 8601 — usar `convertDateStringToISO` (de `@/utils/utilsDate`) para envio e `convertISOToDateString` (local em professorUtils) para recebimento

### Telefone
- O formulário tem **um único campo** de telefone
- A API recebe e retorna um **array** (`telefones: string[]`)
- No envio: `telefones: formData.telefone ? [unmaskPhone(formData.telefone)] : []`
- No recebimento: usar `professor.telefones[0]` (primeiro da lista)

### Dados Bancários
- Todos os campos são **opcionais**
- `buildDadosBancarios()` retorna `undefined` se nenhum campo estiver preenchido — não enviar objeto vazio para a API

### Dependentes
- Lista dinâmica gerenciada com `useFieldArray` do react-hook-form
- Campo `name` usa padrão: `dependentes.${index}.nomeCompleto`
- `dependenteDefaultValues` deve ser usado no `appendDependente()` para garantir valores iniciais corretos
- `buildDependentes()` retorna `undefined` se a lista estiver vazia

### Busca automática de CEP
- Disparada via `useEffect` ao observar o campo `cep` com `watch`
- Só executa quando `cep.length === 9` (formato `00000-000` com máscara)
- Preenche automaticamente: `logradouro`, `bairro`, `cidade`, `uf`, `complemento`
- Exibe `CircularProgress` sobreposto ao campo durante a busca (`buscandoCep`)

### Validação
- Schema Zod em `schema.ts` com validações de formato para CPF (`000.000.000-00`), CEP (`00000-000`), telefone (`(00) 00000-0000`), datas (`dd/mm/aaaa`)
- Campos de nome e cidade aceitam apenas letras + acentuação (regex `/^[A-Za-zÀ-ÿ\s]+$/`)
- `useBrainForm` configurado com `mode: "all"` — valida em blur e onChange

### React Query / Cache
- Após create, update ou delete: invalida `QUERY_KEYS.professores.all`
- Mutations ficam em `useProfessorMutations` — não duplicar lógica de invalidação na page
- Verificar `isPending` de cada mutation para desabilitar o botão de submit e mostrar estado de loading

### Rotas
- Cadastro/edição: `/professor` (sem id = criar, com `?id=X` = editar)
- Listagem: `/professor/lista`
- Após salvar ou cancelar: redirecionar para `/professor/lista`
- Edição a partir da lista: `router.push(\`/professor?id=\${professorId}\`)`

### Proteção de rota
- Ambas as páginas usam `<ProtectedRoute allowedRoles={[UserRoleEnum.PROFESSOR]}>`

### Opções de Select (hardcoded na page.tsx)
As constantes abaixo estão definidas localmente no componente — **não mover para outro lugar sem avaliar reuso**:
- `OPTIONS_UF` — 27 estados brasileiros
- `OPTIONS_GENDER` — masculino, feminino, outro
- `OPTIONS_COR_RACA` — conforme classificação IBGE
- `OPTIONS_TIPO_CONTA` — conta_corrente, conta_poupanca, conta_salario
- `OPTIONS_PARENTESCO` — filho, conjugue, pai, mae, outro
