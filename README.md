# Projeto acadêmico sobre monitoração de sistemas de segurança

## Indice

* Regras para organização dos repositórios
* Comandos relacionados a branch
* Comando úteis do git
* Diferença entre Merge e Rebase
* Extra

---

### Regras para organização dos repositórios

Quando realizar alteração no git devemos dar o `git commit` e o `git push` para um **branch novo**.
Quando a edição realizada no branch estiver completa deve ser feito um **push request** no GitHub e dois dos desenvolvedores devem checar as alteração para ver se existe conflito e verificar o código para que ele seja fundido (merge) com o branch master.

### Comandos relacionados a branch:
- `git branch` = mostra todas as branchs existentes

- `git branch -a` - mostra os branchs locais e os remotos (que estão no github)

- `git checkout -b NOME-DO-BRANCH` = Cria uma nova branch - a partir da branch **master**.

- `git checkout NOME-DO-BRANCH` = sem o `-b` o comando troca de branch

- `git push -u origin NOME-DO-BRANCH` = Dá o push para a nova branch.

- `git branch -d NOME-DO-BRANCH` = Deleta o branch.

- `git merge NOME-DO-BRANCH` = Pega o contéudo do branch desejado e passa para o branch atual.

---

### Comando úteis do git

- `git commit --amend --no-edit --author "NOME CERTO <emailcerto@mydomain.com>"` = Se deu commit com nome/email errado 

- `git commit -am "comentário objetivo"` = Permite você já adicionar arquivo no 'palco' (stage) para que possam ser dado um commit direto.

- `git commit --amend` = Sobrescreve o último commit.


- `git commit --amend -C HEAD` = Adiciona ao ultimo commit com o mesmo comentário.

- `git revert ID-DO-COMMIT` = Reverte o conteúdo e volta as alterações do commit.

*Exemplo: `git revert 504fab770bf8e892ce9a56c6a3fb85eec5320cdf`*.

- `git checkout NOME-DO-ARQUIVO` = Reverte o arquivo para seu estado anterior.

- `git checkout --.` = Reverte tudo.

### Diferença entre Merge e Rebase

O **merge** mescla o *branch* atual com *outro branch* ambos em seu estado atual.
O **rebase** pega seu *branch* atual e muda seu inicio, sua base.


### Extra

Site que te ajuda achar mais facilmente comandos do git: [git_explorer](https://gitexplorer.com/).


**Sites Úteis**
- https://github.com/k88hudson/git-flight-rules
- https://github.com/bennadel/git-cheat-sheet

